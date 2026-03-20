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
	AlertDialogTrigger,
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
import { Field } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export function AlertDialogSection() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [value, setValue] = useState("");

	return (
		<div className="flex items-center gap-4">
			<AlertDialog>
				<AlertDialogTrigger render={<Button variant="destructive-outline" />}>
					Delete Account
				</AlertDialogTrigger>
				<AlertDialogPopup>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogClose render={<Button variant="ghost" />}>
							Cancel
						</AlertDialogClose>
						<AlertDialogClose render={<Button variant="destructive" />}>
							Delete Account
						</AlertDialogClose>
					</AlertDialogFooter>
				</AlertDialogPopup>
			</AlertDialog>
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
	);
}
