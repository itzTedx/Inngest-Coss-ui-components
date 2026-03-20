"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { triggerInngestAction } from "@/app/actions/trigger-inngest";

import { toastManager } from "./ui/toast";

export function InngestTriggerButton() {
	const [loading, setLoading] = useState(false);

	async function handleTrigger() {
		setLoading(true);
		const result = await triggerInngestAction();
		if (result.ok) {
			toastManager.add({
				title: "Event sent! Check your Inngest dashboard.",
				description: "The event has been sent to the Inngest dashboard.",
				type: "success",
			});
		} else {
			toastManager.add({
				title: result.error ?? "Something went wrong.",
				description: "The event has not been sent to the Inngest dashboard.",
				type: "error",
			});
		}
		setLoading(false);
	}

	return (
		<div className="flex flex-col items-center gap-3">
			<Button
				className="rounded-full"
				disabled={loading}
				onClick={handleTrigger}
				size="lg"
				type="button"
			>
				{loading ? (
					<>
						<Spinner className="size-4" />
						Sending…
					</>
				) : (
					"Trigger Inngest"
				)}
			</Button>
		</div>
	);
}
