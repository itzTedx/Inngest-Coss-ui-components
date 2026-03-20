"use client";

import TableCheckboxWithFiltering from "@/components/custom/table-checkbox-with-filtering";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { Label } from "@/components/ui/label";

export function CheckboxSection() {
	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Checkbox id="c1" />
				<Label htmlFor="c1">Accept terms</Label>
			</div>
			<CheckboxGroup>
				<div className="flex items-center gap-2">
					<Checkbox id="cg1" value="a" />
					<Label htmlFor="cg1">Option A</Label>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox id="cg2" value="b" />
					<Label htmlFor="cg2">Option B</Label>
				</div>
			</CheckboxGroup>
			<small>Table with TanStack Table, sorting, and pagination</small>
			<TableCheckboxWithFiltering />
			<Label className="flex items-start gap-2 rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50">
				<Checkbox defaultChecked />
				<div className="flex flex-col gap-1">
					<p>Card-style checkbox</p>
					<p className="text-muted-foreground text-xs">
						You can enable or disable notifications at any time.
					</p>
				</div>
			</Label>
		</div>
	);
}
