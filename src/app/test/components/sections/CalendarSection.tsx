"use client";

import { useState } from "react";

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup } from "@/components/ui/toggle-group";

const timeSlots = [
	{ available: false, time: "09:00" },
	{ available: false, time: "09:30" },
	{ available: true, time: "10:00" },
	{ available: true, time: "10:30" },
	{ available: true, time: "11:00" },
	{ available: true, time: "11:30" },
	{ available: false, time: "12:00" },
	{ available: true, time: "12:30" },
	{ available: true, time: "13:00" },
	{ available: true, time: "13:30" },
	{ available: true, time: "14:00" },
	{ available: false, time: "14:30" },
	{ available: false, time: "15:00" },
	{ available: true, time: "15:30" },
	{ available: true, time: "16:00" },
	{ available: true, time: "16:30" },
	{ available: true, time: "17:00" },
	{ available: true, time: "17:30" },
];

export function CalendarSection() {
	const today = new Date();
	const [date, setDate] = useState<Date>(today);
	const [time, setTime] = useState<string | null>(null);
	const [month, setMonth] = useState(today);

	return (
		<div className="flex max-sm:flex-col">
			<Calendar
				className="max-sm:pb-3 sm:pe-5"
				disabled={[{ before: today }]}
				mode="single"
				onSelect={(newDate) => {
					if (newDate) {
						setDate(newDate);
						setTime(null);
					}
				}}
				selected={date}
			/>
			<div className="relative w-full max-sm:h-48 sm:w-40">
				<div className="absolute inset-0 max-sm:border-t">
					<ScrollArea className="h-full sm:border-s" scrollbarGutter scrollFade>
						<div className="flex flex-col gap-3 py-3 sm:pt-0 sm:pb-2">
							<div className="flex shrink-0 items-center font-medium text-sm sm:h-8 sm:px-5">
								{format(date, "EEEE, d")}
							</div>
							<ToggleGroup
								className="grid w-full gap-1.5 max-sm:grid-cols-2 sm:px-5"
								onValueChange={(values) => setTime(values[0] || null)}
								value={time ? [time] : []}
							>
								{timeSlots.map(({ time: timeSlot, available }) => (
									<Toggle
										disabled={!available}
										key={timeSlot}
										size="sm"
										value={timeSlot}
										variant="outline"
									>
										{timeSlot}
									</Toggle>
								))}
							</ToggleGroup>
						</div>
					</ScrollArea>
				</div>
			</div>
			<Popover>
				<PopoverTrigger
					render={
						<Button
							className="mx-auto w-full max-w-64 justify-start"
							variant="outline"
						/>
					}
				>
					<CalendarIcon aria-hidden="true" />
					{date ? format(date, "PPP") : "Pick a date"}
				</PopoverTrigger>
				<PopoverPopup>
					<div className="flex max-sm:flex-col">
						<div className="relative py-1 ps-1 max-sm:order-1 max-sm:border-t">
							<div className="flex h-full flex-col sm:border-e sm:pe-3">
								<Button
									className="w-full justify-start"
									onClick={() => {
										setDate(today);
										setMonth(today);
									}}
									size="sm"
									variant="ghost"
								>
									Today
								</Button>
								<Button
									className="w-full justify-start"
									onClick={() => {
										const tomorrow = addDays(today, 1);
										setDate(tomorrow);
										setMonth(tomorrow);
									}}
									size="sm"
									variant="ghost"
								>
									Tomorrow
								</Button>
								<Button
									className="w-full justify-start"
									onClick={() => {
										const in3Days = addDays(today, 3);
										setDate(in3Days);
										setMonth(in3Days);
									}}
									size="sm"
									variant="ghost"
								>
									In 3 days
								</Button>
								<Button
									className="w-full justify-start"
									onClick={() => {
										const inAWeek = addDays(today, 7);
										setDate(inAWeek);
										setMonth(inAWeek);
									}}
									size="sm"
									variant="ghost"
								>
									In a week
								</Button>
							</div>
						</div>
						<Calendar
							className="max-sm:pb-3 sm:ps-2"
							mode="single"
							month={month}
							onMonthChange={setMonth}
							onSelect={setDate}
							required
							selected={date}
						/>
					</div>
				</PopoverPopup>
			</Popover>
		</div>
	);
}
