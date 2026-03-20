"use client";

import { Sidebar } from "@/components/shared/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/components/ui/menu";
import {
	Meter,
	MeterIndicator,
	MeterLabel,
	MeterTrack,
} from "@/components/ui/meter";
import {
	NumberField,
	NumberFieldDecrement,
	NumberFieldGroup,
	NumberFieldIncrement,
	NumberFieldInput,
} from "@/components/ui/number-field";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover";
import {
	PreviewCard,
	PreviewCardPopup,
	PreviewCardTrigger,
} from "@/components/ui/preview-card";
import {
	Progress,
	ProgressIndicator,
	ProgressTrack,
} from "@/components/ui/progress";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectItem,
	SelectPopup,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toastManager } from "@/components/ui/toast";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toolbar, ToolbarButton, ToolbarGroup } from "@/components/ui/toolbar";
import {
	Tooltip,
	TooltipPopup,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import { Section } from "./components/Section";
import {
	AccordionSection,
	AlertDialogSection,
	AlertSection,
	AnimatedPopoversSection,
	AutocompleteSection,
	AvatarSection,
	BadgeSection,
	BreadcrumbSection,
	ButtonSection,
	CalendarSection,
	CardSection,
	CheckboxSection,
	CollapsibleSection,
	ComboboxSection,
	CommandSection,
	DialogSection,
	DropdownMenuSection,
	EmptySection,
	FieldSection,
	FrameSection,
} from "./components/sections";
import { GroupSection } from "./components/sections/group-section";
import InputGroupSection from "./components/sections/input-group-section";

const SECTION_TITLES = [
	"Accordion",
	"Alert",
	"Alert Dialog",
	"Autocomplete",
	"Avatar",
	"Animated Popovers",
	"Badge",
	"Breadcrumb",
	"Button",
	"Calendar",
	"Card",
	"Checkbox & CheckboxGroup",
	"Collapsible",
	"Combobox",
	"Command",
	"Dialog",
	"Dropdown Menu",
	"Empty",
	"Field",
	"Frame",
	"Group",
	"Input & Textarea",
	"InputGroup",
	"Kbd",
	"Label",
	"Menu",
	"Meter",
	"NumberField",
	"Pagination",
	"Popover",
	"PreviewCard (HoverCard)",
	"Progress",
	"RadioGroup",
	"ScrollArea",
	"Select",
	"Separator",
	"Sheet",
	"Skeleton",
	"Slider",
	"Spinner",
	"Switch",
	"Table",
	"Tabs",
	"Toast",
	"Toggle & ToggleGroup",
	"Tooltip",
	"Toolbar",
] as const;

export default function TestPage() {
	return (
		<div className="container isolate min-h-min flex-1 items-start px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]">
			<Sidebar SECTION_TITLES={SECTION_TITLES} />
			<div className="mx-auto w-full max-w-4xl py-6 lg:pt-8 lg:pb-8">
				<div className="flex min-w-0 flex-col gap-8">
					<div className="flex flex-col gap-2">
						<h1 className="scroll-m-20 font-heading font-semibold text-3xl xl:text-4xl">
							UI components reference
						</h1>
						<p className="text-muted-foreground sm:text-lg">
							Showcase of all components from{" "}
							<code className="text-sm">@/components/ui</code>
						</p>
					</div>
					<div className="w-full flex-1 space-y-8 *:data-[slot=alert]:first:mt-0">
						<Section title="Accordion">
							<AccordionSection />
						</Section>

						<Section title="Alert">
							<AlertSection />
						</Section>

						<Section title="Alert Dialog">
							<AlertDialogSection />
						</Section>

						<Section title="Autocomplete">
							<AutocompleteSection />
						</Section>

						<Section title="Avatar">
							<AvatarSection />
						</Section>
						<Section title="Animated Popovers">
							<AnimatedPopoversSection />
						</Section>

						<Section title="Badge">
							<BadgeSection />
						</Section>

						<Section title="Breadcrumb">
							<BreadcrumbSection />
						</Section>

						<Section title="Button">
							<ButtonSection />
						</Section>

						<Section title="Calendar">
							<CalendarSection />
						</Section>

						<Section title="Card">
							<CardSection />
						</Section>

						<Section title="Checkbox & CheckboxGroup">
							<CheckboxSection />
						</Section>

						<Section title="Collapsible">
							<CollapsibleSection />
						</Section>

						<Section title="Combobox">
							<ComboboxSection />
						</Section>

						<Section title="Command">
							<CommandSection />
						</Section>

						<Section title="Dialog">
							<DialogSection />
						</Section>

						<Section title="Dropdown Menu">
							<DropdownMenuSection />
						</Section>

						<Section title="Empty">
							<EmptySection />
						</Section>

						<Section title="Field">
							<FieldSection />
						</Section>

						<Section title="Frame">
							<FrameSection />
						</Section>

						<Section title="Group">
							<GroupSection />
						</Section>

						<Section title="Input & Textarea">
							<div className="max-w-sm space-y-4">
								<Input placeholder="Placeholder" />

								<Textarea placeholder="Textarea placeholder" />
							</div>
						</Section>

						<Section title="InputGroup">
							<InputGroupSection />
						</Section>

						<Section title="Kbd">
							<div className="flex flex-wrap gap-2">
								<Kbd>⌘</Kbd>
								<Kbd>K</Kbd>
								<KbdGroup>
									<Kbd>⌘</Kbd>
									<Kbd>Shift</Kbd>
									<Kbd>P</Kbd>
								</KbdGroup>
							</div>
						</Section>

						<Section title="Label">
							<Label htmlFor="label-demo">Label for input</Label>
							<Input
								className="mt-2 max-w-xs"
								id="label-demo"
								placeholder="Focus shows label relation"
							/>
						</Section>

						<Section title="Menu">
							<Menu>
								<MenuTrigger
									render={<Button variant="outline">Open menu</Button>}
								/>
								<MenuPopup>
									<MenuItem>Profile</MenuItem>
									<MenuItem>Settings</MenuItem>
									<MenuItem>Log out</MenuItem>
								</MenuPopup>
							</Menu>
						</Section>

						<Section title="Meter">
							<Meter className="max-w-xs" max={100} min={0} value={65}>
								<MeterLabel>Storage 65%</MeterLabel>
								<MeterTrack>
									<MeterIndicator />
								</MeterTrack>
							</Meter>
						</Section>

						<Section title="NumberField">
							<NumberField defaultValue={5} max={10} min={0}>
								<Label>Quantity</Label>
								<NumberFieldGroup>
									<NumberFieldDecrement />
									<NumberFieldInput />
									<NumberFieldIncrement />
								</NumberFieldGroup>
							</NumberField>
						</Section>

						<Section title="Pagination">
							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious href="#" />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#" isActive>
											1
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">2</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationNext href="#" />
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</Section>

						<Section title="Popover">
							<Popover>
								<PopoverTrigger
									render={<Button variant="outline">Open popover</Button>}
								/>
								<PopoverPopup>
									<div className="space-y-2 p-4">
										<p className="font-medium">Popover content</p>
										<p className="text-muted-foreground text-sm">
											Any content here.
										</p>
									</div>
								</PopoverPopup>
							</Popover>
						</Section>

						<Section title="PreviewCard (HoverCard)">
							<PreviewCard>
								<PreviewCardTrigger
									render={<Button variant="link">Hover me</Button>}
								/>
								<PreviewCardPopup>
									<p className="text-sm">Preview card content on hover.</p>
								</PreviewCardPopup>
							</PreviewCard>
						</Section>

						<Section title="Progress">
							<div className="max-w-xs space-y-2">
								<Progress value={60}>
									<ProgressTrack>
										<ProgressIndicator />
									</ProgressTrack>
								</Progress>
								<Progress value={100}>
									<ProgressTrack>
										<ProgressIndicator />
									</ProgressTrack>
								</Progress>
							</div>
						</Section>

						<Section title="RadioGroup">
							<RadioGroup defaultValue="r1">
								<div className="flex items-center gap-2">
									<Radio id="r1" value="r1" />
									<Label htmlFor="r1">Option 1</Label>
								</div>
								<div className="flex items-center gap-2">
									<Radio id="r2" value="r2" />
									<Label htmlFor="r2">Option 2</Label>
								</div>
							</RadioGroup>
						</Section>

						<Section title="ScrollArea">
							<ScrollArea className="h-24 w-48 rounded-md border p-2">
								<p className="text-sm">
									Scroll area content. Add enough text to show scrolling. Lorem
									ipsum dolor sit amet, consectetur adipiscing elit. Sed do
									eiusmod tempor incididunt ut labore.
								</p>
							</ScrollArea>
						</Section>

						<Section title="Select">
							<Select defaultValue="apple">
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Pick one" />
								</SelectTrigger>
								<SelectPopup>
									<SelectItem value="apple">Apple</SelectItem>
									<SelectItem value="banana">Banana</SelectItem>
									<SelectItem value="cherry">Cherry</SelectItem>
								</SelectPopup>
							</Select>
						</Section>

						<Section title="Separator">
							<div className="space-y-2">
								<p className="text-sm">Above</p>
								<Separator />
								<p className="text-sm">Below</p>
								<div className="flex h-5 items-center gap-2">
									<span className="text-sm">Left</span>
									<Separator orientation="vertical" />
									<span className="text-sm">Right</span>
								</div>
							</div>
						</Section>

						<Section title="Sheet">
							<Sheet>
								<SheetTrigger
									render={<Button variant="outline">Open sheet</Button>}
								/>
								<SheetContent side="right">
									<SheetHeader>
										<SheetTitle>Sheet title</SheetTitle>
										<SheetDescription>Sheet description.</SheetDescription>
									</SheetHeader>
									<p className="py-4 text-muted-foreground text-sm">
										Sheet content. Use SheetClose to close.
									</p>
									<SheetClose render={<Button>Close</Button>} />
								</SheetContent>
							</Sheet>
						</Section>

						<Section title="Skeleton">
							<div className="max-w-xs space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
								<Skeleton className="h-20 w-full rounded-lg" />
							</div>
						</Section>

						<Section title="Slider">
							<Slider
								className="max-w-xs"
								defaultValue={[50]}
								max={100}
								min={0}
							/>
						</Section>

						<Section title="Spinner">
							<Spinner className="size-6" />
						</Section>

						<Section title="Switch">
							<div className="flex items-center gap-2">
								<Switch defaultChecked />
								<Label>Toggle switch</Label>
							</div>
						</Section>

						<Section title="Table">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Value</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>Alpha</TableCell>
										<TableCell>1</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Beta</TableCell>
										<TableCell>2</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Section>

						<Section title="Tabs">
							<Tabs defaultValue={["tab1"]}>
								<TabsList>
									<TabsTab value="tab1">Tab 1</TabsTab>
									<TabsTab value="tab2">Tab 2</TabsTab>
									<TabsTab value="tab3">Tab 3</TabsTab>
								</TabsList>
								<TabsPanel className="pt-2" value="tab1">
									Content for tab 1.
								</TabsPanel>
								<TabsPanel className="pt-2" value="tab2">
									Content for tab 2.
								</TabsPanel>
								<TabsPanel className="pt-2" value="tab3">
									Content for tab 3.
								</TabsPanel>
							</Tabs>
						</Section>

						<Section title="Toast">
							<Button
								onClick={() =>
									toastManager.add({
										title: "Toast example",
										description: "Triggered from the showcase.",
										type: "success",
									})
								}
							>
								Show toast
							</Button>
						</Section>

						<Section title="Toggle & ToggleGroup">
							<div className="flex flex-wrap gap-2">
								<Toggle>Toggle</Toggle>
								<Toggle variant="outline">Outline</Toggle>
								<ToggleGroup defaultValue={["a"]}>
									<ToggleGroupItem value="a">A</ToggleGroupItem>
									<ToggleGroupItem value="b">B</ToggleGroupItem>
									<ToggleGroupItem value="c">C</ToggleGroupItem>
								</ToggleGroup>
							</div>
						</Section>

						<Section title="Tooltip">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger
										render={
											<Button variant="outline">Hover for tooltip</Button>
										}
									/>
									<TooltipPopup>Tooltip content</TooltipPopup>
								</Tooltip>
							</TooltipProvider>
						</Section>

						<Section title="Toolbar">
							<Toolbar>
								<ToolbarGroup>
									<ToolbarButton className="px-2 py-1 text-sm">
										Bold
									</ToolbarButton>
									<ToolbarButton className="px-2 py-1 text-sm">
										Italic
									</ToolbarButton>
									<ToolbarButton className="px-2 py-1 text-sm">
										Underline
									</ToolbarButton>
								</ToolbarGroup>
							</Toolbar>
						</Section>
					</div>
				</div>
			</div>
		</div>
	);
}
