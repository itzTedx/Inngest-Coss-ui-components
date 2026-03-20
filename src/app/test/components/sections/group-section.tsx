"use client";

import { useRef } from "react";

import {
	ArchiveIcon,
	CheckIcon,
	CopyIcon,
	EditIcon,
	EllipsisIcon,
	FilesIcon,
	FilmIcon,
	QrCodeIcon,
	SearchIcon,
	ShareIcon,
	TrashIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Group, GroupSeparator, GroupText } from "@/components/ui/group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/components/ui/menu";
import {
	Select,
	SelectItem,
	SelectPopup,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

const protocols = [
	{ label: "http", value: "http" },
	{ label: "https", value: "https" },
	{ label: "http + https", value: "both" },
];
const subdomains = [
	{ label: "Subdomains", value: null },
	{ label: "www", value: "www" },
	{ label: "api", value: "api" },
	{ label: "cdn", value: "cdn" },
];

export function GroupSection() {
	const { copyToClipboard, isCopied } = useCopyToClipboard();
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className="flex flex-wrap items-center gap-6">
			<Group aria-label="File actions">
				<Button variant="outline">
					<FilesIcon aria-hidden="true" />
					Files
				</Button>
				<GroupSeparator />
				<Button variant="outline">
					<FilmIcon aria-hidden="true" />
					Media
				</Button>
				<GroupSeparator />
				<Menu>
					<MenuTrigger
						render={<Button aria-label="Menu" size="icon" variant="outline" />}
					>
						<EllipsisIcon className="size-4" />
					</MenuTrigger>
					<MenuPopup align="end">
						<MenuItem>
							<EditIcon aria-hidden="true" />
							Edit
						</MenuItem>
						<MenuItem>
							<ArchiveIcon aria-hidden="true" />
							Archive
						</MenuItem>
						<MenuItem>
							<ShareIcon aria-hidden="true" />
							Share
						</MenuItem>
						<MenuItem variant="destructive">
							<TrashIcon aria-hidden="true" />
							Delete
						</MenuItem>
					</MenuPopup>
				</Menu>
			</Group>
			<Group aria-label="Url input">
				<Input
					aria-label="Url"
					defaultValue="https://coss.com"
					ref={inputRef}
					type="text"
				/>
				<GroupSeparator />
				<Tooltip>
					<TooltipTrigger
						render={
							<Button
								aria-label="Copy"
								onClick={() => {
									if (inputRef.current) {
										copyToClipboard(inputRef.current.value);
									}
								}}
								size="icon"
								variant="outline"
							/>
						}
					>
						{isCopied ? <CheckIcon /> : <CopyIcon />}
					</TooltipTrigger>
					<TooltipPopup>
						<p>Copy to clipboard</p>
					</TooltipPopup>
				</Tooltip>
			</Group>
			<Group aria-label="Domain input">
				<GroupText render={<Label aria-label="Domain" htmlFor="domain" />}>
					https://
				</GroupText>
				<GroupSeparator />
				<Input
					aria-label="Domain"
					defaultValue="coss.com"
					id="domain"
					type="text"
				/>
			</Group>
			<Group aria-label="URL search">
				<Select defaultValue="both" items={protocols}>
					<SelectTrigger className="w-fit min-w-none">
						<SelectValue />
					</SelectTrigger>
					<SelectPopup>
						{protocols.map(({ label, value }) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectPopup>
				</Select>
				<GroupSeparator />
				<Input
					aria-label="URL"
					className="flex-1"
					defaultValue="coss.com"
					type="text"
				/>
				<GroupSeparator />
				<Select defaultValue={null} items={subdomains}>
					<SelectTrigger className="w-fit min-w-none">
						<SelectValue />
					</SelectTrigger>
					<SelectPopup>
						{subdomains.map(({ label, value }) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectPopup>
				</Select>
				<GroupSeparator />
				<Button aria-label="Search" size="icon" variant="outline">
					<SearchIcon aria-hidden="true" />
				</Button>
			</Group>
			<Group>
				<Button aria-label="QR code" size="icon">
					<QrCodeIcon aria-hidden="true" />
				</Button>
				<GroupSeparator className="bg-primary/72" />
				<Button>Sign in</Button>
			</Group>
		</div>
	);
}
