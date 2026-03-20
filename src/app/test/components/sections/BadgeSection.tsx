"use client";

import { useState } from "react";

import {
	CheckIcon,
	ChevronsUpDownIcon,
	EllipsisIcon,
	FunnelIcon,
	HouseIcon,
	InboxIcon,
	SearchIcon,
	SettingsIcon,
	XIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Combobox,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	ComboboxPopup,
	ComboboxTrigger,
} from "@/components/ui/combobox";
import { Group, GroupSeparator, GroupText } from "@/components/ui/group";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/components/ui/menu";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";

import type { FilterOption } from "../test-data";
import { MemberAvatar, members } from "../test-data";

export function BadgeSection() {
	const [selectedMembers, setSelectedMembers] = useState<FilterOption[]>(
		members.slice(0, 2)
	);

	const renderTriggerContent = () => {
		if (selectedMembers.length === 0) return "Select";
		const firstMember = selectedMembers[0];
		const remainingCount = selectedMembers.length - 1;
		return (
			<div className="flex items-center gap-2">
				<MemberAvatar
					avatarUrl={firstMember?.avatar}
					name={firstMember?.label ?? ""}
				/>
				<span className="truncate">{firstMember?.label}</span>
				{remainingCount > 0 && (
					<Badge className="tabular-nums" variant="secondary">
						+{remainingCount}
					</Badge>
				)}
			</div>
		);
	};

	return (
		<div className="flex flex-wrap items-center gap-4">
			<Badge>Default</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="outline">Outline</Badge>
			<Badge variant="destructive">Destructive</Badge>
			<Badge variant="error">Error</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="info">Info</Badge>
			<Badge size="sm">Small</Badge>
			<Badge size="lg">Large</Badge>
			<Badge variant="outline">
				<span
					aria-hidden="true"
					className="size-1.5 rounded-full bg-emerald-500"
				/>
				Paid
			</Badge>
			<Badge variant="outline">
				<span
					aria-hidden="true"
					className="size-1.5 rounded-full bg-amber-500"
				/>
				Pending
			</Badge>
			<Badge variant="outline">
				<span aria-hidden="true" className="size-1.5 rounded-full bg-red-500" />
				Failed
			</Badge>
			<Badge variant="outline">
				<CheckIcon aria-hidden="true" />
				Verified
			</Badge>
			<Button variant="outline">
				Messages
				<Badge className="-me-1" variant="outline">
					18
				</Badge>
			</Button>
			<InputGroup className="max-w-64">
				<InputGroupInput
					defaultValue="hello@coss.com"
					placeholder="Enter email"
					type="email"
				/>
				<InputGroupAddon align="inline-end">
					<Badge variant="info">Primary</Badge>
					<Menu>
						<MenuTrigger
							render={
								<Button aria-label="Open menu" size="icon-xs" variant="ghost" />
							}
						>
							<EllipsisIcon />
						</MenuTrigger>
						<MenuPopup align="end" alignOffset={-4} sideOffset={8}>
							<MenuItem disabled>Make Primary</MenuItem>
							<MenuItem variant="destructive">Delete</MenuItem>
						</MenuPopup>
					</Menu>
				</InputGroupAddon>
			</InputGroup>
			<Group>
				<GroupText
					className={cn(
						buttonVariants({
							size: "sm",
							variant: "outline",
						}),
						"pointer-events-none"
					)}
				>
					<FunnelIcon />
					Member
				</GroupText>
				<GroupSeparator />
				<Combobox
					autoHighlight
					items={members}
					multiple
					onValueChange={(value) => {
						if (Array.isArray(value)) {
							setSelectedMembers(value);
						}
					}}
					value={selectedMembers}
				>
					<ComboboxTrigger
						render={
							<Button
								className={
									selectedMembers.length === 0 ? "justify-between" : undefined
								}
								size="sm"
								variant="outline"
							/>
						}
					>
						{renderTriggerContent()}
						{selectedMembers.length === 0 && (
							<ChevronsUpDownIcon className="-me-1!" />
						)}
					</ComboboxTrigger>
					<ComboboxPopup aria-label="Select member">
						<div className="border-b p-2">
							<ComboboxInput
								className="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
								placeholder="Search members..."
								showTrigger={false}
								startAddon={<SearchIcon />}
							/>
						</div>
						<ComboboxEmpty>No members found.</ComboboxEmpty>
						<ComboboxList>
							{(option: FilterOption) => (
								<ComboboxItem key={option.id} value={option}>
									<div className="flex items-center gap-2">
										<MemberAvatar
											avatarUrl={option.avatar}
											name={option.label}
										/>
										<span>{option.label}</span>
									</div>
								</ComboboxItem>
							)}
						</ComboboxList>
					</ComboboxPopup>
				</Combobox>
				<GroupSeparator />
				<Button
					aria-label="Remove filter"
					onClick={() => setSelectedMembers([])}
					size="icon-sm"
					variant="outline"
				>
					<XIcon />
				</Button>
			</Group>
			<Tabs defaultValue="tab-1">
				<TabsList>
					<TabsTab value="tab-1">
						All
						<Badge
							className="not-in-data-active:text-muted-foreground"
							variant="outline"
						>
							128
						</Badge>
					</TabsTab>
					<TabsTab value="tab-2">
						Pending
						<Badge
							className="not-in-data-active:text-muted-foreground"
							variant="outline"
						>
							8
						</Badge>
					</TabsTab>
					<TabsTab value="tab-3">
						Completed
						<Badge
							className="not-in-data-active:text-muted-foreground"
							variant="outline"
						>
							120
						</Badge>
					</TabsTab>
				</TabsList>
				<TabsPanel value="tab-1">
					<p className="p-4 text-center text-muted-foreground text-xs">
						All items content
					</p>
				</TabsPanel>
				<TabsPanel value="tab-2">
					<p className="p-4 text-center text-muted-foreground text-xs">
						Pending items content
					</p>
				</TabsPanel>
				<TabsPanel value="tab-3">
					<p className="p-4 text-center text-muted-foreground text-xs">
						Completed items content
					</p>
				</TabsPanel>
			</Tabs>
			<Tabs className="items-center" defaultValue="tab-1">
				<TabsList>
					<TabsTab aria-label="Overview" className="size-10!" value="tab-1">
						<HouseIcon aria-hidden="true" />
					</TabsTab>
					<TabsTab aria-label="Inbox" className="size-10!" value="tab-2">
						<InboxIcon aria-hidden="true" />
						<Badge
							className="absolute inset-e-0 top-0 rounded-full not-in-data-active:opacity-64"
							size="sm"
						>
							5
						</Badge>
					</TabsTab>
					<TabsTab aria-label="Settings" className="size-10!" value="tab-3">
						<SettingsIcon aria-hidden="true" />
					</TabsTab>
				</TabsList>
				<TabsPanel value="tab-1">
					<p className="p-4 text-center text-muted-foreground text-xs">
						Overview content
					</p>
				</TabsPanel>
				<TabsPanel value="tab-2">
					<p className="p-4 text-center text-muted-foreground text-xs">
						Inbox content
					</p>
				</TabsPanel>
				<TabsPanel value="tab-3">
					<p className="p-4 text-center text-muted-foreground text-xs">
						Settings content
					</p>
				</TabsPanel>
			</Tabs>
		</div>
	);
}
