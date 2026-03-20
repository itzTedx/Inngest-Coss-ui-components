import {
	Card,
	CardFrame,
	CardFrameHeader,
	CardFrameTitle,
	CardPanel,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

function sectionTitleToId(title: string): string {
	return title
		.toLowerCase()
		.replace(/\s*&\s*/g, "-")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

export function Section({
	title,
	children,
	className,
	id,
}: {
	title: string;
	children: React.ReactNode;
	className?: string;
	id?: string;
}) {
	const sectionId = id ?? sectionTitleToId(title);
	return (
		<CardFrame
			className={cn(
				"scroll-mt-24 border-sidebar-border shadow-lg/5 dark:bg-background",
				className
			)}
			id={sectionId}
		>
			<CardFrameHeader>
				<CardFrameTitle className="font-semibold text-lg">
					{title}
				</CardFrameTitle>
			</CardFrameHeader>
			<Card className="dark:bg-background max-lg:[clip-path:none]!">
				<CardPanel>{children}</CardPanel>
			</Card>
		</CardFrame>
	);
}
