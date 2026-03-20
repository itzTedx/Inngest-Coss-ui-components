"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useInngestSubscription } from "@inngest/realtime/hooks";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toastManager } from "@/components/ui/toast";

import {
	getRunStatusAction,
	startImageUploadStreamAction,
} from "@/app/actions/trigger-inngest";

const POLL_INTERVAL_MS = 800;
const MAX_POLL_MS = 30_000;

type StreamToken = { channel: string; topics: string[]; key: string };

function parseProgressData(data: unknown): {
	step?: string;
	message?: string;
	done?: boolean;
	output?: unknown;
} | null {
	if (typeof data !== "string") return null;
	try {
		return JSON.parse(data) as {
			step?: string;
			message?: string;
			done?: boolean;
			output?: unknown;
		};
	} catch {
		return null;
	}
}

export function ImageUploadTriggerButton() {
	const [token, setToken] = useState<StreamToken | null>(null);
	const [eventId, setEventId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const fallbackPollingRef = useRef(false);

	// Token from server is { channel, topics, key }; hook expects Token type (channel can be string for dynamic channels)
	const subscriptionOptions = {
		token: token ?? undefined,
		enabled: !!token,
	};
	const { latestData, state, error } = useInngestSubscription(
		subscriptionOptions as Parameters<typeof useInngestSubscription>[0]
	);

	const handleTrigger = useCallback(async () => {
		setLoading(true);
		setToken(null);
		setEventId(null);
		fallbackPollingRef.current = false;
		const result = await startImageUploadStreamAction();
		setLoading(false);
		if (!result.ok) {
			toastManager.add({
				title: "Image workflow failed",
				description: result.error,
				type: "error",
			});
			return;
		}
		setToken(result.token);
		setEventId(result.eventId);
	}, []);

	// When we receive a "done" message, show success and stop subscribing
	useEffect(() => {
		if (!latestData?.data) return;
		const parsed = parseProgressData(latestData.data);
		if (parsed?.done === true) {
			toastManager.add({
				title: "Image workflow complete",
				description: parsed?.output
					? "Thumbnail & medium ready. Check Inngest dashboard for URLs."
					: "Thumbnail & medium sizes ready.",
				type: "success",
			});
			setToken(null);
			setEventId(null);
		}
	}, [latestData]);

	// When WebSocket fails (e.g. self-hosted Inngest without Realtime), fall back to polling
	useEffect(() => {
		if (!error || !eventId || !token || fallbackPollingRef.current) return;
		fallbackPollingRef.current = true;
		setToken(null);

		toastManager.add({
			title: "Live updates unavailable",
			description: "Checking workflow status… (Realtime may not be supported by your Inngest server.)",
			type: "info",
		});

		const deadline = Date.now() + MAX_POLL_MS;

		const poll = async () => {
			if (Date.now() >= deadline) {
				toastManager.add({
					title: "Status check timed out",
					description: "Workflow may still be running. Check the Inngest dashboard.",
					type: "warning",
				});
				setEventId(null);
				return;
			}
			const status = await getRunStatusAction(eventId);
			if (!status.ok) {
				setEventId(null);
				return;
			}
			const run = status.runs?.[0] as { status?: string; output?: unknown } | undefined;
			const runStatus = String(run?.status ?? "").toLowerCase();

			if (runStatus === "completed") {
				toastManager.add({
					title: "Image workflow complete",
					description: run?.output
						? "Thumbnail & medium ready. Check Inngest dashboard for URLs."
						: "Thumbnail & medium sizes ready.",
					type: "success",
				});
				setEventId(null);
				return;
			}
			if (runStatus === "failed" || runStatus === "cancelled") {
				toastManager.add({
					title: "Image workflow failed",
					description: `Workflow ${runStatus}. Check Inngest dashboard for details.`,
					type: "error",
				});
				setEventId(null);
				return;
			}
			setTimeout(poll, POLL_INTERVAL_MS);
		};

		poll();
	}, [error, eventId, token]);

	const latestStep = latestData?.data
		? parseProgressData(latestData.data)
		: null;
	const isRunning = loading || !!token || !!eventId;
	const progressLabel = latestStep?.done
		? "Complete"
		: (latestStep?.message ??
			(eventId && !token ? "Checking status…" : token ? "Connecting…" : null));

	return (
		<div className="flex flex-col items-center gap-2">
			<Button
				className="rounded-full"
				disabled={isRunning}
				onClick={handleTrigger}
				size="lg"
				type="button"
				variant="secondary"
			>
				{isRunning ? (
					<>
						<Spinner className="size-4" />
						{progressLabel ?? "Running…"}
					</>
				) : (
					"Simulate image upload"
				)}
			</Button>
			{state && token && (
				<p className="text-muted-foreground text-xs">
					Stream: {state}
					{latestStep?.message ? ` · ${latestStep.message}` : ""}
				</p>
			)}
		</div>
	);
}
