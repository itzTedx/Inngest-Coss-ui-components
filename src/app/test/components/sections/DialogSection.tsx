"use client";

import { useState } from "react";

import {
	AlertDialog,
	AlertDialogClose,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogPopup,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogPanel,
	DialogPopup,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function DialogSection() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [value, setValue] = useState("");

	return (
		<div className="flex flex-col gap-4">
			<div>
				<p>Dialog with form</p>
				<Dialog>
					<DialogTrigger render={<Button variant="outline" />}>
						Open Dialog
					</DialogTrigger>
					<DialogPopup className="sm:max-w-sm">
						<Form className="contents">
							<DialogHeader>
								<DialogTitle>Edit profile</DialogTitle>
								<DialogDescription>
									Make changes to your profile here. Click save when you&apos;re
									done.
								</DialogDescription>
							</DialogHeader>
							<DialogPanel className="grid gap-4">
								<Field>
									<FieldLabel>Name</FieldLabel>
									<Input defaultValue="Margaret Welsh" type="text" />
								</Field>
								<Field>
									<FieldLabel>Username</FieldLabel>
									<Input defaultValue="@maggie.welsh" type="text" />
								</Field>
							</DialogPanel>
							<DialogFooter>
								<DialogClose render={<Button variant="ghost" />}>
									Cancel
								</DialogClose>
								<Button type="submit">Save</Button>
							</DialogFooter>
						</Form>
					</DialogPopup>
				</Dialog>
			</div>
			<div>
				<p>Nested dialogs</p>
				<Dialog>
					<DialogTrigger render={<Button variant="outline" />}>
						Open parent
					</DialogTrigger>
					<DialogPopup showCloseButton={false}>
						<DialogHeader>
							<DialogTitle>Manage team member</DialogTitle>
							<DialogDescription>
								View and manage a user in your team.
							</DialogDescription>
						</DialogHeader>
						<DialogPanel className="grid gap-4">
							<div className="grid gap-1">
								<p className="text-muted-foreground text-sm">Name</p>
								<p className="font-medium text-sm">Bora Baloglu</p>
							</div>
							<div className="grid gap-1">
								<p className="text-muted-foreground text-sm">Email</p>
								<p className="font-medium text-sm">bora@example.com</p>
							</div>
						</DialogPanel>
						<DialogFooter>
							<Dialog>
								<DialogTrigger render={<Button variant="outline" />}>
									Edit details
								</DialogTrigger>
								<DialogPopup showCloseButton={false}>
									<DialogHeader>
										<DialogTitle>Edit details</DialogTitle>
										<DialogDescription>
											Make changes to the member&apos;s information.
										</DialogDescription>
									</DialogHeader>
									<DialogPanel className="grid gap-4">
										<Field>
											<FieldLabel>Name</FieldLabel>
											<Input defaultValue="Bora Baloglu" type="text" />
										</Field>
										<Field>
											<FieldLabel>Email</FieldLabel>
											<Input defaultValue="bora@example.com" type="text" />
										</Field>
									</DialogPanel>
									<DialogFooter>
										<DialogClose render={<Button variant="ghost" />}>
											Cancel
										</DialogClose>
										<Button type="submit">Save changes</Button>
									</DialogFooter>
								</DialogPopup>
							</Dialog>
						</DialogFooter>
					</DialogPopup>
				</Dialog>
			</div>
			<div>
				<p>Dialog with close confirmation</p>
				<Dialog
					onOpenChange={(o) => {
						if (!o && value) {
							setConfirmOpen(true);
						} else {
							setDialogOpen(o);
						}
					}}
					open={dialogOpen}
				>
					<DialogTrigger render={<Button variant="outline" />}>
						Compose
					</DialogTrigger>
					<DialogPopup showCloseButton={false}>
						<DialogHeader>
							<DialogTitle>New message</DialogTitle>
							<DialogDescription>
								Type something and try closing.
							</DialogDescription>
						</DialogHeader>
						<Form
							className="contents"
							onSubmit={(event) => {
								event.preventDefault();
								setDialogOpen(false);
							}}
						>
							<DialogPanel>
								<Field>
									<Textarea
										onChange={(e) => setValue(e.target.value)}
										value={value}
									/>
								</Field>
							</DialogPanel>
							<DialogFooter>
								<DialogClose render={<Button variant="ghost" />}>
									Cancel
								</DialogClose>
								<Button
									onClick={() => {
										setValue("");
										setDialogOpen(false);
									}}
								>
									Send
								</Button>
							</DialogFooter>
						</Form>
					</DialogPopup>
					<AlertDialog onOpenChange={setConfirmOpen} open={confirmOpen}>
						<AlertDialogPopup>
							<AlertDialogHeader>
								<AlertDialogTitle>Discard changes?</AlertDialogTitle>
								<AlertDialogDescription>
									Your message will be lost.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogClose render={<Button variant="ghost" />}>
									Go back
								</AlertDialogClose>
								<Button
									onClick={() => {
										setConfirmOpen(false);
										setValue("");
										setDialogOpen(false);
									}}
								>
									Discard
								</Button>
							</AlertDialogFooter>
						</AlertDialogPopup>
					</AlertDialog>
				</Dialog>
			</div>
		</div>
	);
}
