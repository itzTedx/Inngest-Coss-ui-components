"use client";

import { useEffect, useRef, useState } from "react";

import {
	BellIcon,
	CheckIcon,
	CopyIcon,
	DownloadIcon,
	InfoIcon,
	PlusIcon,
	PrinterIcon,
	XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Group, GroupSeparator, GroupText } from "@/components/ui/group";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { toastManager } from "@/components/ui/toast";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";

export function ButtonSection() {
	const [copied, setCopied] = useState(false);
	const [open, setOpen] = useState(false);
	const handleCopy = () => {
		navigator.clipboard.writeText("Text copied!");
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const [isDownloading, setIsDownloading] = useState(false);
	const [progress, setProgress] = useState(0);
	const abortControllerRef = useRef<AbortController | null>(null);
	const infoToastIdRef = useRef<string | null>(null);

	useEffect(() => {
		if (!isDownloading) return;
		const interval = setInterval(() => {
			setProgress((prev) =>
				Math.min(99, prev + Math.round(Math.random() * 8 + 2))
			);
		}, 300);
		return () => clearInterval(interval);
	}, [isDownloading]);

	async function handleDownload() {
		if (isDownloading) return;
		setIsDownloading(true);
		setProgress(0);
		abortControllerRef.current = new AbortController();
		infoToastIdRef.current = toastManager.add({
			description: "Your download will begin once ready.",
			title: "Generating report…",
			type: "info",
		});
		try {
			await new Promise<string>((resolve, reject) => {
				const shouldSucceed = Math.random() > 0.2;
				const timeoutId = setTimeout(() => {
					if (shouldSucceed) {
						resolve("Download complete");
					} else {
						reject(new Error("Download failed"));
					}
				}, 4000);
				abortControllerRef.current?.signal.addEventListener("abort", () => {
					clearTimeout(timeoutId);
					reject(new DOMException("Cancelled", "AbortError"));
				});
			});
		} catch (err) {
			if (infoToastIdRef.current) {
				toastManager.close(infoToastIdRef.current);
				infoToastIdRef.current = null;
			}
			if (err instanceof DOMException && err.name === "AbortError") {
				toastManager.add({
					description: "Report generation was cancelled.",
					title: "Cancelled",
					type: "error",
				});
			} else {
				toastManager.add({
					description: "Please try again later.",
					title: "Failed to generate report",
					type: "error",
				});
			}
		} finally {
			setIsDownloading(false);
			setProgress(0);
			abortControllerRef.current = null;
			infoToastIdRef.current = null;
		}
	}

	function handleCancel() {
		abortControllerRef.current?.abort();
	}

	return (
		<div className="flex flex-wrap items-center gap-4">
			<Button>Default</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
			<Button variant="destructive">Destructive</Button>
			<Button size="sm">Small</Button>
			<Button size="lg">Large</Button>
			<Button size="icon">
				<BellIcon />
			</Button>
			<Button
				aria-label={copied ? "Copied" : "Copy to clipboard"}
				onClick={handleCopy}
				size="icon"
				variant="outline"
			>
				{copied ? (
					<CheckIcon aria-hidden="true" />
				) : (
					<CopyIcon aria-hidden="true" />
				)}
			</Button>
			<Button
				aria-expanded={open}
				aria-label={open ? "Close menu" : "Open menu"}
				className="rounded-full before:rounded-full"
				onClick={() => setOpen((prev) => !prev)}
				size="icon"
				variant="outline"
			>
				<PlusIcon
					aria-hidden="true"
					className="in-aria-expanded:rotate-135 transition-transform duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)]"
				/>
			</Button>
			<Button variant="outline">
				<PrinterIcon aria-hidden="true" />
				Print
				<KbdGroup className="-me-1">
					<Kbd>&#8984;</Kbd>
					<Kbd>P</Kbd>
				</KbdGroup>
			</Button>
			{isDownloading ? (
				<Group>
					<GroupText
						aria-live="polite"
						className="cursor-default gap-2"
						role="status"
					>
						<Spinner />
						<span
							aria-hidden="true"
							className="font-medium text-foreground tabular-nums"
						>
							{progress.toString().padStart(2, "\u2007")}%
						</span>
						<span className="sr-only">
							Generating report, {progress}% complete
						</span>
					</GroupText>
					<GroupSeparator />
					<Tooltip>
						<TooltipTrigger
							render={
								<Button
									aria-label="Cancel download"
									onClick={handleCancel}
									size="icon"
									variant="outline"
								/>
							}
						>
							<XIcon aria-hidden="true" />
						</TooltipTrigger>
						<TooltipPopup>Cancel</TooltipPopup>
					</Tooltip>
				</Group>
			) : (
				<Button onClick={handleDownload} variant="outline">
					<DownloadIcon aria-hidden="true" />
					Download
				</Button>
			)}
			<Button
				aria-expanded={open}
				aria-label={open ? "Close menu" : "Open menu"}
				onClick={() => setOpen((prev) => !prev)}
				size="icon"
				variant="outline"
			>
				<svg
					aria-hidden="true"
					className="pointer-events-none"
					fill="none"
					height={16}
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					viewBox="0 0 24 24"
					width={16}
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						className="origin-center in-[[data-slot=button][aria-expanded=true]]:translate-x-0 -translate-y-[7px] in-[[data-slot=button][aria-expanded=true]]:translate-y-0 in-[[data-slot=button][aria-expanded=true]]:rotate-315 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]"
						d="M4 12L20 12"
					/>
					<path
						className="origin-center in-[[data-slot=button][aria-expanded=true]]:rotate-45 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]"
						d="M4 12H20"
					/>
					<path
						className="origin-center in-[[data-slot=button][aria-expanded=true]]:translate-y-0 translate-y-[7px] in-[[data-slot=button][aria-expanded=true]]:rotate-135 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]"
						d="M4 12H20"
					/>
				</svg>
			</Button>
			<InputGroup className="max-w-64">
				<InputGroupInput
					aria-label="Set your URL"
					className="*:[input]:ps-0!"
					placeholder="coss.com"
					type="text"
				/>
				<InputGroupAddon>https://</InputGroupAddon>
				<InputGroupAddon align="inline-end">
					<Popover>
						<PopoverTrigger
							openOnHover
							render={
								<Button aria-label="More info" size="icon-xs" variant="ghost" />
							}
						>
							<InfoIcon />
						</PopoverTrigger>
						<PopoverPopup side="top" tooltipStyle>
							<p>The URL of your website</p>
						</PopoverPopup>
					</Popover>
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
}
