"use client";

import { Fragment } from "react";

import { SearchIcon } from "lucide-react";

import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxCollection,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxGroupLabel,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	ComboboxPopup,
	ComboboxSeparator,
	ComboboxValue,
} from "@/components/ui/combobox";

import type { Tag, TagGroup } from "../test-data";
import { accordionItems, groupedTags } from "../test-data";

export function ComboboxSection() {
	return (
		<div className="space-y-9">
			<small>Combobox multiple with start addon</small>
			<Combobox
				defaultValue={[accordionItems[0], accordionItems[2]]}
				items={accordionItems}
				multiple
			>
				<ComboboxChips startAddon={<SearchIcon />}>
					<ComboboxValue>
						{(
							value: {
								value?: string;
								label?: string;
								id?: string;
								title?: string;
							}[]
						) => {
							const safeValues = (value ?? []).filter(
								(item): item is NonNullable<typeof item> => item != null
							);
							return (
								<>
									{safeValues.map((item) => (
										<ComboboxChip
											aria-label={item.label ?? item.title ?? ""}
											key={item.value ?? item.id ?? String(item)}
										>
											{item.label ?? item.title}
										</ComboboxChip>
									))}
									<ComboboxChipsInput
										aria-label="Select a item"
										placeholder={
											safeValues.length > 0 ? undefined : "Select a item..."
										}
									/>
								</>
							);
						}}
					</ComboboxValue>
				</ComboboxChips>
				<ComboboxPopup>
					<ComboboxEmpty>No items found.</ComboboxEmpty>
					<ComboboxList>
						{(item: {
							value?: string;
							label?: string;
							id?: string;
							title?: string;
						}) => (
							<ComboboxItem key={item.value ?? item.id} value={item}>
								{item.label ?? item.title}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxPopup>
			</Combobox>
			<small>Autocomplete with items</small>
			<Combobox items={groupedTags}>
				<div className="flex flex-col items-start gap-2">
					<ComboboxInput aria-label="Search tags" placeholder="e.g. feature" />
				</div>
				<ComboboxPopup>
					<ComboboxEmpty>No tags found.</ComboboxEmpty>
					<ComboboxList>
						{(group: TagGroup) => (
							<Fragment key={group.value}>
								<ComboboxGroup items={group.items}>
									<ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
									<ComboboxCollection>
										{(tag: Tag) => (
											<ComboboxItem key={tag.id} value={tag}>
												{tag.label}
											</ComboboxItem>
										)}
									</ComboboxCollection>
								</ComboboxGroup>
								{group.value !== "Team" && <ComboboxSeparator />}
							</Fragment>
						)}
					</ComboboxList>
				</ComboboxPopup>
			</Combobox>
		</div>
	);
}
