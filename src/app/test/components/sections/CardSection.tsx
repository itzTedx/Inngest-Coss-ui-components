"use client";

import {
	CircleAlertIcon,
	FolderIcon,
	PlusIcon,
	ShieldAlertIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardFrame,
	CardFrameAction,
	CardFrameDescription,
	CardFrameFooter,
	CardFrameHeader,
	CardFrameTitle,
	CardHeader,
	CardPanel,
	CardTitle,
} from "@/components/ui/card";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import {
	Frame,
	FrameDescription,
	FrameFooter,
	FrameHeader,
	FrameTitle,
} from "@/components/ui/frame";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectItem,
	SelectPopup,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { frameworkOptions } from "../test-data";

export function CardSection() {
	return (
		<div className="flex flex-wrap gap-9">
			<Card className="w-full max-w-xs">
				<CardHeader>
					<CardTitle>Create project</CardTitle>
					<CardDescription>A basic card with header and footer</CardDescription>
				</CardHeader>
				<CardPanel>
					<Form>
						<Field>
							<FieldLabel>Name</FieldLabel>
							<Input placeholder="Name of your project" type="text" />
						</Field>
						<Field>
							<FieldLabel>Framework</FieldLabel>
							<Select defaultValue="next" items={frameworkOptions}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectPopup>
									{frameworkOptions.map(({ label, value }) => (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									))}
								</SelectPopup>
							</Select>
						</Field>
						<Button className="w-full" type="submit">
							Deploy
						</Button>
					</Form>
				</CardPanel>
				<CardFooter>
					<div className="flex gap-1 text-muted-foreground text-xs">
						<CircleAlertIcon className="size-3 h-lh shrink-0" />
						<p>This will take a few seconds to complete.</p>
					</div>
				</CardFooter>
			</Card>
			<Card className="w-full max-w-xs">
				<CardHeader className="border-b">
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>Authentication card with separators</CardDescription>
				</CardHeader>
				<CardPanel>
					<Form>
						<Field>
							<FieldLabel>Email</FieldLabel>
							<Input placeholder="Enter your email" type="email" />
						</Field>
						<Field>
							<FieldLabel>Password</FieldLabel>
							<Input placeholder="Enter your password" type="password" />
						</Field>
						<Button className="w-full" type="submit">
							Login
						</Button>
					</Form>
				</CardPanel>
				<CardFooter className="border-t">
					<div className="flex gap-1 text-muted-foreground text-xs">
						<ShieldAlertIcon className="size-3 h-lh shrink-0" />
						<p>The information you enter is encrypted and stored securely.</p>
					</div>
				</CardFooter>
			</Card>
			<CardFrame className="w-full max-w-xs">
				<Card>
					<CardHeader>
						<CardTitle>Create project</CardTitle>
						<CardDescription>Framed card with footer</CardDescription>
					</CardHeader>
					<CardPanel>
						<Form>
							<Field>
								<FieldLabel>Name</FieldLabel>
								<Input placeholder="Name of your project" type="text" />
							</Field>
							<Field>
								<FieldLabel>Framework</FieldLabel>
								<Select defaultValue="next" items={frameworkOptions}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectPopup>
										{frameworkOptions.map(({ label, value }) => (
											<SelectItem key={value} value={value}>
												{label}
											</SelectItem>
										))}
									</SelectPopup>
								</Select>
							</Field>
							<Button className="w-full" type="submit">
								Deploy
							</Button>
						</Form>
					</CardPanel>
				</Card>
				<CardFrameFooter>
					<div className="flex gap-1 text-muted-foreground text-xs">
						<CircleAlertIcon className="size-3 h-lh shrink-0" />
						<p>This will take a few seconds to complete.</p>
					</div>
				</CardFrameFooter>
			</CardFrame>
			<CardFrame className="h-fit w-full max-w-xs">
				<CardFrameHeader>
					<CardFrameTitle>Create project</CardFrameTitle>
					<CardFrameDescription>Framed card with header</CardFrameDescription>
				</CardFrameHeader>
				<Card>
					<Form className="contents">
						<CardPanel>
							<div className="flex flex-col gap-4">
								<Field>
									<FieldLabel>Name</FieldLabel>
									<Input placeholder="Name of your project" type="text" />
								</Field>
								<Field>
									<FieldLabel>Framework</FieldLabel>
									<Select defaultValue="next" items={frameworkOptions}>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectPopup>
											{frameworkOptions.map(({ label, value }) => (
												<SelectItem key={value} value={value}>
													{label}
												</SelectItem>
											))}
										</SelectPopup>
									</Select>
								</Field>
							</div>
						</CardPanel>
						<CardFooter>
							<Button className="w-full" type="submit">
								Deploy
							</Button>
						</CardFooter>
					</Form>
				</Card>
			</CardFrame>
			<CardFrame className="w-full max-w-xs">
				<CardFrameHeader>
					<CardFrameTitle>Create project</CardFrameTitle>
					<CardFrameDescription>
						Framed card with header and footer
					</CardFrameDescription>
				</CardFrameHeader>
				<Card>
					<CardPanel>
						<Form>
							<Field>
								<FieldLabel>Name</FieldLabel>
								<Input placeholder="Name of your project" type="text" />
							</Field>
							<Field>
								<FieldLabel>Framework</FieldLabel>
								<Select defaultValue="next" items={frameworkOptions}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectPopup>
										{frameworkOptions.map(({ label, value }) => (
											<SelectItem key={value} value={value}>
												{label}
											</SelectItem>
										))}
									</SelectPopup>
								</Select>
							</Field>
							<Button className="w-full" type="submit">
								Deploy
							</Button>
						</Form>
					</CardPanel>
				</Card>
				<CardFrameFooter>
					<div className="flex gap-1 text-muted-foreground text-xs">
						<CircleAlertIcon className="size-3 h-lh shrink-0" />
						<p>This will take a few seconds to complete.</p>
					</div>
				</CardFrameFooter>
			</CardFrame>
			<Frame className="w-full max-w-xs">
				<Card>
					<CardHeader>
						<CardTitle>Create project</CardTitle>
						<CardDescription>Card within a frame and footer</CardDescription>
					</CardHeader>
					<CardPanel>
						<Form>
							<Field>
								<FieldLabel>Name</FieldLabel>
								<Input placeholder="Name of your project" type="text" />
							</Field>
							<Field>
								<FieldLabel>Framework</FieldLabel>
								<Select defaultValue="next" items={frameworkOptions}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectPopup>
										{frameworkOptions.map(({ label, value }) => (
											<SelectItem key={value} value={value}>
												{label}
											</SelectItem>
										))}
									</SelectPopup>
								</Select>
							</Field>
							<Button className="w-full" type="submit">
								Deploy
							</Button>
						</Form>
					</CardPanel>
				</Card>
				<FrameFooter>
					<div className="flex gap-1 text-muted-foreground text-xs">
						<CircleAlertIcon className="size-3 h-lh shrink-0" />
						<p>This will take a few seconds to complete.</p>
					</div>
				</FrameFooter>
			</Frame>
			<Frame className="w-full max-w-xs">
				<FrameHeader>
					<FrameTitle>Create project</FrameTitle>
					<FrameDescription>Card within a frame and footer</FrameDescription>
				</FrameHeader>
				<Card>
					<CardPanel>
						<Form>
							<Field>
								<FieldLabel>Name</FieldLabel>
								<Input placeholder="Name of your project" type="text" />
							</Field>
							<Field>
								<FieldLabel>Framework</FieldLabel>
								<Select defaultValue="next" items={frameworkOptions}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectPopup>
										{frameworkOptions.map(({ label, value }) => (
											<SelectItem key={value} value={value}>
												{label}
											</SelectItem>
										))}
									</SelectPopup>
								</Select>
							</Field>
							<Button className="w-full" type="submit">
								Deploy
							</Button>
						</Form>
					</CardPanel>
				</Card>
			</Frame>
			<CardFrame className="w-full">
				<CardFrameHeader>
					<CardFrameTitle>Project</CardFrameTitle>
					<CardFrameDescription>Manage your projects</CardFrameDescription>
					<CardFrameAction>
						<Button variant="outline">
							<PlusIcon />
							Add
						</Button>
					</CardFrameAction>
				</CardFrameHeader>
				<Card>
					<CardPanel>
						<Empty>
							<EmptyHeader>
								<EmptyMedia variant="icon">
									<FolderIcon />
								</EmptyMedia>
								<EmptyTitle>No projects yet</EmptyTitle>
								<EmptyDescription>
									Get started by adding your first project.
								</EmptyDescription>
							</EmptyHeader>
						</Empty>
					</CardPanel>
				</Card>
			</CardFrame>
		</div>
	);
}
