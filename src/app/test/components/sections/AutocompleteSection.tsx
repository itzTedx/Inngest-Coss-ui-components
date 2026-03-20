"use client";

import {
	Autocomplete,
	AutocompleteEmpty,
	AutocompleteInput,
	AutocompleteItem,
	AutocompleteList,
	AutocompletePopup,
} from "@/components/ui/autocomplete";

import { autocompleteItems } from "../test-data";

export function AutocompleteSection() {
	return (
		<Autocomplete items={autocompleteItems}>
			<AutocompleteInput
				aria-label="Search items"
				placeholder="Search items…"
				showClear
				showTrigger
			/>
			<AutocompletePopup>
				<AutocompleteEmpty>No items found.</AutocompleteEmpty>
				<AutocompleteList>
					{(item) => (
						<AutocompleteItem key={item.value} value={item}>
							{item.label}
						</AutocompleteItem>
					)}
				</AutocompleteList>
			</AutocompletePopup>
		</Autocomplete>
	);
}
