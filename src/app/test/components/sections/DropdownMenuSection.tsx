"use client";

import {
	ChevronDownIcon,
	DownloadIcon,
	EditIcon,
	PauseIcon,
	PlayIcon,
	ShareIcon,
	SkipBackIcon,
	SkipForwardIcon,
	TrashIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Group, GroupSeparator } from "@/components/ui/group";
import {
	Menu,
	MenuCheckboxItem,
	MenuGroup,
	MenuGroupLabel,
	MenuItem,
	MenuPopup,
	MenuRadioGroup,
	MenuRadioItem,
	MenuSeparator,
	MenuShortcut,
	MenuSub,
	MenuSubPopup,
	MenuSubTrigger,
	MenuTrigger,
} from "@/components/ui/menu";

export function DropdownMenuSection() {
	return (
		<>
			<Group aria-label="Subscription actions" className="mb-9">
				<Button>Group with menu</Button>
				<GroupSeparator className="bg-primary/72" />
				<Menu>
					<MenuTrigger
						render={<Button aria-label="Copy options" size="icon" />}
					>
						<ChevronDownIcon aria-hidden="true" className="size-4" />
					</MenuTrigger>
					<MenuPopup align="end">
						<MenuItem>
							<ShareIcon aria-hidden="true" />
							Share link
						</MenuItem>
						<MenuItem>
							<DownloadIcon aria-hidden="true" />
							Download
						</MenuItem>
						<MenuItem>
							<EditIcon aria-hidden="true" />
							Duplicate
						</MenuItem>
					</MenuPopup>
				</Menu>
			</Group>
			<Menu>
				<MenuTrigger render={<Button variant="outline" />}>
					Basic menu
				</MenuTrigger>
				<MenuPopup>
					<MenuGroup>
						<MenuGroupLabel>Playback</MenuGroupLabel>
						<MenuItem>
							<PlayIcon aria-hidden="true" />
							Play
							<MenuShortcut>⌘P</MenuShortcut>
						</MenuItem>
						<MenuItem disabled>
							<PauseIcon aria-hidden="true" />
							Pause
							<MenuShortcut>⇧⌘P</MenuShortcut>
						</MenuItem>
						<MenuItem>
							<SkipBackIcon aria-hidden="true" />
							Previous
							<MenuShortcut>⌘[</MenuShortcut>
						</MenuItem>
						<MenuItem>
							<SkipForwardIcon aria-hidden="true" />
							Next
							<MenuShortcut>⌘]</MenuShortcut>
						</MenuItem>
					</MenuGroup>
					<MenuSeparator />
					<MenuCheckboxItem>Shuffle</MenuCheckboxItem>
					<MenuCheckboxItem>Repeat</MenuCheckboxItem>
					<MenuCheckboxItem disabled>Enhanced Audio</MenuCheckboxItem>
					<MenuSeparator />
					<MenuGroup>
						<MenuGroupLabel>Sort by</MenuGroupLabel>
						<MenuRadioGroup>
							<MenuRadioItem value="artist">Artist</MenuRadioItem>
							<MenuRadioItem value="album">Album</MenuRadioItem>
							<MenuRadioItem value="title">Title</MenuRadioItem>
						</MenuRadioGroup>
					</MenuGroup>
					<MenuSeparator />
					<MenuCheckboxItem variant="switch">Auto save</MenuCheckboxItem>
					<MenuSeparator />
					<MenuSub>
						<MenuSubTrigger>Add to Playlist</MenuSubTrigger>
						<MenuSubPopup>
							<MenuItem>Jazz</MenuItem>
							<MenuSub>
								<MenuSubTrigger>Rock</MenuSubTrigger>
								<MenuSubPopup>
									<MenuItem>Hard Rock</MenuItem>
									<MenuItem>Soft Rock</MenuItem>
									<MenuItem>Classic Rock</MenuItem>
									<MenuSeparator />
									<MenuItem>Metal</MenuItem>
									<MenuItem>Punk</MenuItem>
									<MenuItem>Grunge</MenuItem>
									<MenuItem>Alternative</MenuItem>
									<MenuItem>Indie</MenuItem>
									<MenuItem>Electronic</MenuItem>
								</MenuSubPopup>
							</MenuSub>
							<MenuItem>Pop</MenuItem>
						</MenuSubPopup>
					</MenuSub>
					<MenuSeparator />
					<MenuItem variant="destructive">
						<TrashIcon aria-hidden="true" />
						Delete
						<MenuShortcut>⌘⌫</MenuShortcut>
					</MenuItem>
				</MenuPopup>
			</Menu>
		</>
	);
}
