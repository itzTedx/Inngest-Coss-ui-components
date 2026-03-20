import { channel, topic } from "@inngest/realtime";

/**
 * Channel for streaming image workflow progress.
 * Subscribe to `image-workflow.${uuid}` with topic "progress" to receive live updates.
 */
export const imageWorkflowChannel = channel(
	(uuid: string) => `image-workflow.${uuid}`
).addTopic(topic("progress").type<string>());
