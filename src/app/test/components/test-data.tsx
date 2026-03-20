import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

export type FilterOption = {
	id: string;
	label: string;
	avatar?: string;
};

export const members: FilterOption[] = [
	{
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
		id: "alex-chen",
		label: "Alex Chen",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
		id: "sarah-johnson",
		label: "Sarah Johnson",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
		id: "marcus-williams",
		label: "Marcus Williams",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=faces",
		id: "emma-davis",
		label: "Emma Davis",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
		id: "james-miller",
		label: "James Miller",
	},
];

export function getInitials(name: string): string {
	const parts = name.trim().split(/\s+/);
	if (parts.length === 1) {
		return parts[0]?.charAt(0).toUpperCase() ?? "";
	}
	const first = parts[0]?.charAt(0) ?? "";
	const last = parts[parts.length - 1]?.charAt(0) ?? "";
	return (first + last).toUpperCase();
}

export function MemberAvatar({
	name,
	avatarUrl,
	className,
}: {
	name: string;
	avatarUrl?: string;
	className?: string;
}) {
	return (
		<Avatar className={cn("size-5", className)}>
			{avatarUrl ? <AvatarImage alt={name} src={avatarUrl} /> : null}
			<AvatarFallback className="text-[0.5rem]">
				{getInitials(name)}
			</AvatarFallback>
		</Avatar>
	);
}

export const accordionItems = [
	{
		content:
			"Base UI is a library of high-quality unstyled React components for design systems and web apps.",
		id: "1",
		title: "What is Base UI?",
	},
	{
		content:
			"Head to the \"Quick start\" guide in the docs. If you've used unstyled libraries before, you'll feel at home.",
		id: "2",
		title: "How do I get started?",
	},
	{
		content: "Of course! Base UI is free and open source.",
		id: "3",
		title: "Can I use it for my project?",
	},
];

export const autocompleteItems = [
	{ label: "Apple", value: "apple" },
	{ label: "Banana", value: "banana" },
	{ label: "Orange", value: "orange" },
	{ label: "Grape", value: "grape" },
	{ label: "Strawberry", value: "strawberry" },
	{ label: "Mango", value: "mango" },
	{ label: "Pineapple", value: "pineapple" },
	{ label: "Kiwi", value: "kiwi" },
	{ label: "Peach", value: "peach" },
	{ label: "Pear", value: "pear" },
];

export const frameworkOptions = [
	{ label: "Next.js", value: "next" },
	{ label: "Vite", value: "vite" },
	{ label: "Remix", value: "remix" },
	{ label: "Astro", value: "astro" },
];

export type Tag = {
	id: string;
	label: string;
	group: "Status" | "Priority" | "Team";
};
export type TagGroup = { value: string; items: Tag[] };

export const tagsData: Tag[] = [
	{ group: "Status", id: "s-open", label: "Open" },
	{ group: "Status", id: "s-in-progress", label: "In progress" },
	{ group: "Status", id: "s-blocked", label: "Blocked" },
	{ group: "Status", id: "s-resolved", label: "Resolved" },
	{ group: "Status", id: "s-closed", label: "Closed" },
	{ group: "Priority", id: "p-low", label: "Low" },
	{ group: "Priority", id: "p-medium", label: "Medium" },
	{ group: "Priority", id: "p-high", label: "High" },
	{ group: "Priority", id: "p-urgent", label: "Urgent" },
	{ group: "Team", id: "t-design", label: "Design" },
	{ group: "Team", id: "t-frontend", label: "Frontend" },
	{ group: "Team", id: "t-backend", label: "Backend" },
	{ group: "Team", id: "t-devops", label: "DevOps" },
	{ group: "Team", id: "t-qa", label: "QA" },
	{ group: "Team", id: "t-mobile", label: "Mobile" },
	{ group: "Team", id: "t-data", label: "Data" },
	{ group: "Team", id: "t-security", label: "Security" },
	{ group: "Team", id: "t-platform", label: "Platform" },
	{ group: "Team", id: "t-infra", label: "Infrastructure" },
	{ group: "Team", id: "t-product", label: "Product" },
	{ group: "Team", id: "t-marketing", label: "Marketing" },
	{ group: "Team", id: "t-sales", label: "Sales" },
	{ group: "Team", id: "t-support", label: "Support" },
	{ group: "Team", id: "t-research", label: "Research" },
	{ group: "Team", id: "t-content", label: "Content" },
	{ group: "Team", id: "t-analytics", label: "Analytics" },
	{ group: "Team", id: "t-operations", label: "Operations" },
	{ group: "Team", id: "t-finance", label: "Finance" },
	{ group: "Team", id: "t-hr", label: "HR" },
	{ group: "Team", id: "t-legal", label: "Legal" },
	{ group: "Team", id: "t-growth", label: "Growth" },
	{ group: "Team", id: "t-partner", label: "Partner" },
	{ group: "Team", id: "t-community", label: "Community" },
	{ group: "Team", id: "t-docs", label: "Docs" },
	{ group: "Team", id: "t-l10n", label: "Localization" },
	{ group: "Team", id: "t-a11y", label: "Accessibility" },
	{ group: "Team", id: "t-sre", label: "SRE" },
	{ group: "Team", id: "t-release", label: "Release" },
	{ group: "Team", id: "t-architecture", label: "Architecture" },
	{ group: "Team", id: "t-ux", label: "UX" },
	{ group: "Team", id: "t-ui", label: "UI" },
	{ group: "Team", id: "t-management", label: "Management" },
];

export function groupTags(tags: Tag[]): TagGroup[] {
	const groups: Record<string, Tag[]> = {};
	for (const tag of tags) {
		if (!groups[tag.group]) {
			groups[tag.group] = [];
		}
		groups[tag.group]!.push(tag);
	}
	const order: Array<TagGroup["value"]> = ["Status", "Priority", "Team"];
	return order.map((value) => ({ items: groups[value] ?? [], value }));
}

export const groupedTags = groupTags(tagsData);
