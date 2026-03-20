"use client";

import { BookIcon, InfoIcon, RouteIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

export function EmptySection() {
	return (
		<div className="flex flex-col gap-9">
			<Empty className="rounded-lg border border-dashed">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<InfoIcon className="size-5" />
					</EmptyMedia>
					<EmptyTitle>No items yet</EmptyTitle>
					<EmptyDescription>
						Get started by creating your first item.
					</EmptyDescription>
				</EmptyHeader>
			</Empty>
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<RouteIcon />
					</EmptyMedia>
					<EmptyTitle>No upcoming meetings</EmptyTitle>
					<EmptyDescription>Create a meeting to get started.</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button size="sm">Create meeting</Button>
						<Button size="sm" variant="outline">
							<BookIcon />
							View docs
						</Button>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}
