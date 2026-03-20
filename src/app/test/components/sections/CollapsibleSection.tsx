"use client";

import { ChevronDownIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsiblePanel,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Frame, FrameHeader, FramePanel } from "@/components/ui/frame";

export function CollapsibleSection() {
	return (
		<div className="space-y-6">
			<small>Basic collapsible</small>
			<Collapsible>
				<CollapsibleTrigger className="inline-flex items-center gap-2 font-medium text-sm data-panel-open:[&_svg]:rotate-180">
					Show recovery keys
					<ChevronDownIcon className="size-4" />
				</CollapsibleTrigger>
				<CollapsiblePanel>
					<ul className="flex flex-col gap-1 py-2 text-muted-foreground text-sm">
						<li className="rounded-sm bg-muted px-2 py-1 font-mono">
							4829-1735-6621
						</li>
						<li className="rounded-sm bg-muted px-2 py-1 font-mono">
							9182-6407-5532
						</li>
						<li className="rounded-sm bg-muted px-2 py-1 font-mono">
							3051-7924-9018
						</li>
					</ul>
				</CollapsiblePanel>
			</Collapsible>
			<small>Frame with collapsible content and delete button</small>
			<Frame className="w-full">
				<Collapsible>
					<FrameHeader className="flex-row items-center justify-between px-2 py-2">
						<CollapsibleTrigger
							className="data-panel-open:[&_svg]:rotate-180"
							render={<Button variant="ghost" />}
						>
							<ChevronDownIcon className="size-4" />
							Section header
						</CollapsibleTrigger>
						<Button aria-label="Delete" size="icon" variant="ghost">
							<TrashIcon />
						</Button>
					</FrameHeader>
					<CollapsiblePanel>
						<FramePanel>
							<h2 className="font-semibold text-sm">Section title</h2>
							<p className="text-muted-foreground text-sm">
								Section description
							</p>
						</FramePanel>
					</CollapsiblePanel>
				</Collapsible>
			</Frame>
		</div>
	);
}
