import { google } from "@ai-sdk/google";
import { generateText } from "ai";

import { imageWorkflowChannel } from "./channels";
import { inngest } from "./client";

// Event payload for AI generate text (background job)
type AIGenerateTextPayload = {
	prompt: string;
};

const DEFAULT_AI_PROMPT = "Write a vegetarian lasagna recipe for 4 people.";

// No step.run() so the function completes in one execution and never goes to "Queued" for a replay.
// Step would cause Inngest to replay after the step completes; that replay can get stuck Queued.
export const aiGenerateTextWorkflow = inngest.createFunction(
	{
		id: "ai-generate-text",
		retries: 2,
	},
	{ event: "app/ai.generate-text" },
	async ({ event }) => {
		const data = event.data as AIGenerateTextPayload;
		const prompt = data.prompt?.trim() || DEFAULT_AI_PROMPT;

		const result = await generateText({
			model: google("gemini-2.5-flash"),
			prompt,
		});
		return { text: result.text };
	}
);

export const helloWorld = inngest.createFunction(
	{ id: "hello-world" },
	{ event: "test/hello.world" },

	async ({ step }) => {
		await step.sleep("wait-a-moment", "1s");

		await step.run("create-workflow", async () => {
			return true;
		});
	}
);

// Event payload for image upload workflow (uuid required for Realtime streaming)
type ImageUploadPayload = {
	uuid: string;
	url: string;
	filename: string;
	contentType?: string;
	width?: number;
	height?: number;
};

const THUMBNAIL_SIZE = { width: 150, height: 150 };
const MEDIUM_MAX = { width: 800, height: 600 };

export const imageUploadWorkflow = inngest.createFunction(
	{
		id: "image-upload-workflow",
		retries: 2,
	},
	{ event: "app/image.uploaded" },
	async ({ event, step, publish }) => {
		const data = event.data as ImageUploadPayload;
		const baseUrl = data.url.replace(/\.[^.]+$/, "");
		const now = Date.now();
		const uuid = data.uuid ?? "";

		const sendProgress = async (message: string) => {
			if (uuid) await publish(imageWorkflowChannel(uuid).progress(message));
		};

		// Step 1: Process — validate and normalize metadata
		await sendProgress(
			JSON.stringify({ step: "processing", message: "Processing image…" })
		);
		const processed = await step.run("process-image", async () => {
			await new Promise((r) => setTimeout(r, 400));
			const w = data.width ?? 1920;
			const h = data.height ?? 1080;
			return {
				url: `${baseUrl}-processed.${data.contentType?.split("/")[1] ?? "jpg"}`,
				width: w,
				height: h,
				processedAt: new Date().toISOString(),
			};
		});

		// Step 2: Compress
		await sendProgress(
			JSON.stringify({ step: "compressing", message: "Compressing…" })
		);
		const compressed = await step.run("compress-image", async () => {
			await new Promise((r) => setTimeout(r, 600));
			return {
				url: `${baseUrl}-compressed.${data.contentType?.split("/")[1] ?? "jpg"}`,
				width: processed.width,
				height: processed.height,
				estimatedSizeKb: 420,
				compressedAt: new Date().toISOString(),
			};
		});

		// Step 3: Convert to WebP
		await sendProgress(
			JSON.stringify({ step: "webp", message: "Converting to WebP…" })
		);
		const webp = await step.run("convert-to-webp", async () => {
			await new Promise((r) => setTimeout(r, 500));
			return {
				url: `${baseUrl}.webp`,
				width: compressed.width,
				height: compressed.height,
				format: "webp",
				convertedAt: new Date().toISOString(),
			};
		});

		// Step 4: Generate thumbnail size
		await sendProgress(
			JSON.stringify({ step: "thumbnail", message: "Generating thumbnail…" })
		);
		const thumbnail = await step.run("generate-thumbnail", async () => {
			await new Promise((r) => setTimeout(r, 300));
			return {
				url: `${baseUrl}-thumb-${THUMBNAIL_SIZE.width}x${THUMBNAIL_SIZE.height}.webp`,
				width: THUMBNAIL_SIZE.width,
				height: THUMBNAIL_SIZE.height,
				format: "webp",
				generatedAt: new Date().toISOString(),
			};
		});

		// Step 5: Generate medium size
		await sendProgress(
			JSON.stringify({ step: "medium", message: "Generating medium size…" })
		);
		const medium = await step.run("generate-medium", async () => {
			await new Promise((r) => setTimeout(r, 400));
			const w = Math.min(webp.width, MEDIUM_MAX.width);
			const h = Math.min(webp.height, MEDIUM_MAX.height);
			return {
				url: `${baseUrl}-medium-${w}x${h}.webp`,
				width: w,
				height: h,
				format: "webp",
				generatedAt: new Date().toISOString(),
			};
		});

		const output = {
			original: data.url,
			processed: processed.url,
			compressed: compressed.url,
			webp: webp.url,
			thumbnail: thumbnail.url,
			medium: medium.url,
			completedAt: new Date().toISOString(),
			runId: now,
		};
		await sendProgress(JSON.stringify({ done: true, output }));
		return output;
	}
);
