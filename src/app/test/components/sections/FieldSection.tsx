"use client";

import {
	Field,
	FieldDescription,
	FieldItem,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function FieldSection() {
	return (
		<Field>
			<FieldLabel>Field label</FieldLabel>
			<FieldItem>
				<Input placeholder="With field wrapper" />
			</FieldItem>
			<FieldDescription>Helper or hint text.</FieldDescription>
		</Field>
	);
}
