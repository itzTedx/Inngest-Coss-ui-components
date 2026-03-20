import { BoldIcon, InfoIcon, ItalicIcon, LinkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";

export default function InputGroupSection() {
	return (
		<div className="grid grid-cols-2 items-center gap-6">
			<InputGroup>
				<InputGroupInput
					aria-label="Choose a username"
					placeholder="Choose a username"
					type="text"
				/>
				<InputGroupAddon align="inline-end">
					<InputGroupText>@coss.com</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput
					aria-label="Password"
					placeholder="Password"
					type="password"
				/>
				<InputGroupAddon align="inline-end">
					<Popover>
						<PopoverTrigger
							openOnHover
							render={
								<Button
									aria-label="Password requirements"
									size="icon-xs"
									variant="ghost"
								/>
							}
						>
							<InfoIcon />
						</PopoverTrigger>
						<PopoverPopup side="top" tooltipStyle>
							<p>Min. 8 characters</p>
						</PopoverPopup>
					</Popover>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupAddon align="inline-start">https://</InputGroupAddon>
				<Input placeholder="site.com" />
			</InputGroup>
			<InputGroup>
				<Input placeholder="Search" />
				<InputGroupAddon align="inline-end">
					<Kbd>⌘</Kbd>
					<Kbd>K</Kbd>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupTextarea placeholder="Tell us about yourself…" />
				<InputGroupAddon
					align="block-start"
					className="gap-1 rounded-t-lg border-b bg-muted/72 p-2!"
				>
					<Toggle aria-label="Toggle bold" size="sm">
						<BoldIcon aria-hidden="true" />
					</Toggle>
					<Toggle aria-label="Toggle italic" size="sm">
						<ItalicIcon aria-hidden="true" />
					</Toggle>
					<Button aria-label="Link" size="icon-sm" variant="ghost">
						<LinkIcon aria-hidden="true" />
					</Button>
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
}
