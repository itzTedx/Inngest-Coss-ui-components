"use client";

import {
	Frame,
	FrameHeader,
	FramePanel,
	FrameTitle,
} from "@/components/ui/frame";

export function FrameSection() {
	return (
		<Frame className="max-w-md">
			<FramePanel>
				<FrameHeader>
					<FrameTitle>Frame panel</FrameTitle>
				</FrameHeader>
				<p className="px-5 pb-4 text-muted-foreground text-sm">
					Frame content area.
				</p>
			</FramePanel>
		</Frame>
	);
}
