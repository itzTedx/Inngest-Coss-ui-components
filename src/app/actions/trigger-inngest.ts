"use server";

import { getSubscriptionToken } from "@inngest/realtime";

import { inngest } from "@/inngest/client";

import { randomUUID } from "node:crypto";

import { generateTextAction } from "./generate-text";

/** Returns run status for an event (for polling). Uses Inngest API with signing key. */
export async function getRunStatusAction(
	eventId: string
): Promise<{ ok: true; runs: unknown[] } | { ok: false; error: string }> {
	const baseUrl = process.env.INNGEST_BASE_URL;
	const signingKey = process.env.INNGEST_SIGNING_KEY;
	if (!baseUrl || !signingKey) {
		return { ok: false, error: "Inngest not configured" };
	}
	try {
		const url = `${baseUrl.replace(/\/$/, "")}/v1/events/${eventId}/runs`;
		const res = await fetch(url, {
			headers: { Authorization: `Bearer ${signingKey}` },
		});
		if (!res.ok) {
			const text = await res.text();
			return { ok: false, error: text || "Inngest API error" };
		}
		const body = (await res.json()) as { data?: unknown[]; [k: string]: unknown };
		const runs = Array.isArray(body?.data)
			? body.data
			: Array.isArray(body)
				? body
				: [];
		return { ok: true, runs };
	} catch (err) {
		console.error("Run status fetch error:", err);
		return { ok: false, error: "Failed to fetch run status" };
	}
}

export async function triggerInngestAction() {
	try {
		await inngest.send({
			name: "test/hello.world",
			data: { email: "homepage@example.com" },
		});
		return { ok: true as const };
	} catch (error) {
		console.error("Inngest send error:", error);
		return { ok: false as const, error: "Failed to send event" };
	}
}

const DEFAULT_AI_PROMPT = "Write a vegetarian lasagna recipe for 4 people.";

/** Triggers the AI generate-text background job. Returns eventId for polling. */
export async function triggerAIGenerateTextAction(
	prompt: string = DEFAULT_AI_PROMPT
): Promise<
	{ ok: true; eventId: string } | { ok: false; error: string }
> {
	try {
		const { ids } = await inngest.send({
			name: "app/ai.generate-text",
			data: { prompt },
		});
		const eventId = ids?.[0] ?? "";
		return eventId
			? { ok: true, eventId }
			: { ok: false, error: "No event ID returned" };
	} catch (error) {
		console.error("Inngest send error (AI generate):", error);
		return {
			ok: false as const,
			error: error instanceof Error ? error.message : "Failed to send event",
		};
	}
}

const AI_POLL_MS = 60_000; // 60s for AI job (Gemini can be slow; worker may need time to pick up)

/** Triggers the AI generate-text job and polls until completed. Returns the generated text.
 * If the Inngest job times out (e.g. worker not reachable), falls back to direct AI call so the user still gets a result. */
export async function triggerAIGenerateTextAndWaitAction(
	prompt: string = DEFAULT_AI_PROMPT
): Promise<
	{ ok: true; text: string } | { ok: false; error: string }
> {
	const trigger = await triggerAIGenerateTextAction(prompt);
	if (!trigger.ok) return trigger;

	const { eventId } = trigger;
	const deadline = Date.now() + AI_POLL_MS;

	while (Date.now() < deadline) {
		const status = await getRunStatusAction(eventId);
		if (!status.ok) return status;

		const runs = Array.isArray(status.runs) ? status.runs : [];
		// Find a completed run (API may return "Completed"; one event can have multiple runs)
		for (const r of runs) {
			const run = r as {
				status?: string;
				output?: { text?: string } | string;
			};
			const runStatus = String(run?.status ?? "").toLowerCase();
			if (runStatus === "failed" || runStatus === "cancelled") {
				return { ok: false, error: `Workflow ${runStatus}` };
			}
			if (runStatus === "completed") {
				const out = run?.output;
				const text =
					typeof out === "string"
						? out
						: typeof out === "object" && out !== null && "text" in out
							? (out as { text?: string }).text
							: undefined;
				if (typeof text === "string") return { ok: true, text };
			}
		}
		// No completed run yet (Running, Queued, etc.) — keep polling
		await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
	}

	// Inngest job didn't complete in time (e.g. worker not connected to Inngest). Fall back to direct AI call.
	const fallback = await generateTextAction(prompt);
	return fallback;
}

/** Triggers the image upload workflow (simulator) with a mock upload. Returns eventId for polling via getRunStatusAction. */
export async function triggerImageUploadAction(): Promise<
	{ ok: true; eventId: string } | { ok: false; error: string }
> {
	try {
		const { ids } = await inngest.send({
			name: "app/image.uploaded",
			data: {
				url: "/uploads/sample-photo.jpg",
				filename: "sample-photo.jpg",
				contentType: "image/jpeg",
				width: 1920,
				height: 1080,
			},
		});
		const eventId = ids?.[0] ?? "";
		return eventId
			? { ok: true, eventId }
			: { ok: false, error: "No event ID returned" };
	} catch (error) {
		console.error("Inngest send error:", error);
		return { ok: false as const, error: "Failed to send event" };
	}
}

const POLL_INTERVAL_MS = 800;
const MAX_POLL_MS = 30_000;

/** Triggers the image workflow and polls until completed/failed. Use with toastManager.promise for loading/success/error. */
export async function triggerImageUploadAndWaitAction(): Promise<
	{ ok: true; output?: unknown } | { ok: false; error: string }
> {
	const trigger = await triggerImageUploadAction();
	if (!trigger.ok) return trigger;

	const { eventId } = trigger;
	const deadline = Date.now() + MAX_POLL_MS;

	while (Date.now() < deadline) {
		const status = await getRunStatusAction(eventId);
		if (!status.ok) return status;

		const run = status.runs?.[0] as
			| { status?: string; output?: unknown }
			| undefined;
		const runStatus = String(run?.status ?? "").toLowerCase();

		if (runStatus === "completed") {
			return { ok: true, output: run?.output };
		}
		if (runStatus === "failed" || runStatus === "cancelled") {
			return { ok: false, error: `Workflow ${runStatus}` };
		}

		await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
	}

	return { ok: false, error: "Timed out" };
}

/**
 * Starts the image upload workflow with a unique channel and returns a Realtime
 * subscription token + eventId. eventId is used to poll run status when Realtime
 * WebSocket is unavailable (e.g. self-hosted without Realtime support).
 */
export async function startImageUploadStreamAction(): Promise<
	| {
			ok: true;
			token: { channel: string; topics: string[]; key: string };
			eventId: string;
	  }
	| { ok: false; error: string }
> {
	const uuid = randomUUID();
	try {
		const { ids } = await inngest.send({
			name: "app/image.uploaded",
			data: {
				uuid,
				url: "/uploads/sample-photo.jpg",
				filename: "sample-photo.jpg",
				contentType: "image/jpeg",
				width: 1920,
				height: 1080,
			},
		});
		const eventId = ids?.[0] ?? "";

		const token = await getSubscriptionToken(inngest, {
			channel: `image-workflow.${uuid}`,
			topics: ["progress"],
		});
		if (!token.key) {
			return { ok: false as const, error: "Failed to get subscription token" };
		}
		const serialized = {
			channel:
				typeof token.channel === "string"
					? token.channel
					: (token.channel as { name: string }).name,
			topics: token.topics,
			key: token.key,
		};
		return { ok: true, token: serialized, eventId };
	} catch (error) {
		console.error("Image upload stream start error:", error);
		return {
			ok: false as const,
			error:
				error instanceof Error ? error.message : "Failed to start workflow",
		};
	}
}
