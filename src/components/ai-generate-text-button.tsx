"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { triggerAIGenerateTextAndWaitAction } from "@/app/actions/trigger-inngest";

export function AIGenerateTextButton() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	async function handleGenerate() {
		setLoading(true);
		setError(null);
		setResult(null);
		const response = await triggerAIGenerateTextAndWaitAction();
		if (response.ok) {
			setResult(response.text);
		} else {
			setError(response.error);
		}
		setLoading(false);
	}

	return (
		<div className="flex w-full max-w-2xl flex-col gap-4">
			<Button
				className="rounded-full"
				disabled={loading}
				onClick={handleGenerate}
				size="lg"
				type="button"
			>
				{loading ? (
					<>
						<Spinner className="size-4" />
						Generating…
					</>
				) : (
					"Generate recipe (AI)"
				)}
			</Button>
			{error && (
				<div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm dark:border-red-800 dark:bg-red-950/30 dark:text-red-200">
					{error}
				</div>
			)}
			{result && (
				<div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left text-sm text-zinc-800 leading-relaxed dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-200">
					<p className="whitespace-pre-wrap">{result}</p>
				</div>
			)}
		</div>
	);
}
