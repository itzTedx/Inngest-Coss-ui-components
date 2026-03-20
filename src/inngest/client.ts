import { realtimeMiddleware } from "@inngest/realtime/middleware";
import { Inngest } from "inngest";

/**
 * Inngest client configured for self-hosted instance at https://workflow.alliedgulf.me/
 * Set INNGEST_BASE_URL in .env to override (e.g. for local dev use http://localhost:8288).
 * Realtime middleware enables publish() in functions for live progress streaming.
 */
export const inngest = new Inngest({
	id: "inngest-app",
	...(process.env.INNGEST_BASE_URL && {
		baseUrl: process.env.INNGEST_BASE_URL,
	}),
	eventKey: process.env.INNGEST_EVENT_KEY,
	signingKey: process.env.INNGEST_SIGNING_KEY,
	middleware: [realtimeMiddleware()],
});
