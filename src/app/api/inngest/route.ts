import { serve } from "inngest/next";

import { inngest } from "@/inngest/client";
import {
	aiGenerateTextWorkflow,
	helloWorld,
	imageUploadWorkflow,
} from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
	client: inngest,
	functions: [aiGenerateTextWorkflow, helloWorld, imageUploadWorkflow],
});
