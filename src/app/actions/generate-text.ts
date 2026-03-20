"use server";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const DEFAULT_PROMPT = "Write a vegetarian lasagna recipe for 4 people.";

const google = createGoogleGenerativeAI();

export async function generateTextAction(
	prompt: string = DEFAULT_PROMPT
): Promise<{ ok: true; text: string } | { ok: false; error: string }> {
	if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
		return { ok: false, error: "GOOGLE_GENERATIVE_AI_API_KEY is not set" };
	}
	try {
		const { text } = await generateText({
			model: google("gemini-2.5-flash"),
			system: "You are a helpful assistant that generates text.",
			prompt,
		});
		return { ok: true, text };
	} catch (error) {
		console.error("AI generateText error:", error);
		const message =
			error instanceof Error ? error.message : "Failed to generate text";
		return { ok: false, error: message };
	}
}
