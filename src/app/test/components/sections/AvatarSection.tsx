"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarSection() {
	return (
		<div className="flex items-center gap-4">
			<Avatar>
				<AvatarImage alt="Avatar" src="https://github.com/shadcn.png" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>
			<Avatar className="size-12">
				<AvatarFallback>XL</AvatarFallback>
			</Avatar>
		</div>
	);
}
