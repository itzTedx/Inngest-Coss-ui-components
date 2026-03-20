import { useCallback } from "react";

import { ScrollArea } from "../ui/scroll-area";

function sectionTitleToId(title: string): string {
	return title
		.toLowerCase()
		.replace(/\s*&\s*/g, "-")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

export const Sidebar = ({
	SECTION_TITLES,
}: { SECTION_TITLES: readonly string[] }) => {
	const scrollToSection = useCallback((title: string) => {
		const id = sectionTitleToId(title);
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	}, []);

	return (
		<aside
			aria-label="Section navigation"
			className="sticky top-20 left-4 z-10 hidden h-[calc(100vh-6rem)] w-52 shrink-0 flex-col [--sidebar-width:220px] [--top-spacing:0] md:flex lg:flex lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]"
		>
			<nav className="flex min-h-0 flex-1 flex-col overflow-hidden">
				<p className="mb-2 shrink-0 font-medium text-muted-foreground text-xs uppercase tracking-wider">
					On this page
				</p>
				<ScrollArea
					className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-2 [-webkit-overflow-scrolling:touch]"
					scrollFade
				>
					<ul className="space-y-0.5">
						{SECTION_TITLES.map((title) => (
							<li key={title}>
								<button
									className="w-full cursor-pointer rounded-md px-2 py-1.5 text-left text-muted-foreground text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
									onClick={() => scrollToSection(title)}
									type="button"
								>
									{title}
								</button>
							</li>
						))}
					</ul>
				</ScrollArea>
			</nav>
		</aside>
	);
};
