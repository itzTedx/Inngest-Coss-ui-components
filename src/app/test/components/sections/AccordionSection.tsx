"use client";

import {
	Accordion,
	AccordionItem,
	AccordionPanel,
	AccordionTrigger,
} from "@/components/ui/accordion";

import { accordionItems } from "../test-data";

export function AccordionSection() {
	return (
		<Accordion className="w-full" defaultValue={["1"]}>
			{accordionItems.map((item) => (
				<AccordionItem key={item.id} value={item.id}>
					<AccordionTrigger>{item.title}</AccordionTrigger>
					<AccordionPanel>{item.content}</AccordionPanel>
				</AccordionItem>
			))}
		</Accordion>
	);
}
