"use client";

import { InfoIcon } from "lucide-react";

import {
	Alert,
	AlertAction,
	AlertDescription,
	AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function AlertSection() {
	return (
		<div className="space-y-3">
			<Alert>
				<InfoIcon />
				<AlertTitle>Default</AlertTitle>
				<AlertDescription>Default alert message.</AlertDescription>
			</Alert>
			<Alert variant="success">
				<InfoIcon />
				<AlertTitle>Success</AlertTitle>
				<AlertDescription>Operation completed.</AlertDescription>
			</Alert>
			<Alert variant="error">
				<InfoIcon />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>Something went wrong.</AlertDescription>
			</Alert>
			<Alert variant="warning">
				<InfoIcon />
				<AlertTitle>Warning</AlertTitle>
				<AlertDescription>Please review before continuing.</AlertDescription>
			</Alert>
			<Alert>
				<InfoIcon />
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>
					Describe what can be done about it here.
				</AlertDescription>
				<AlertAction>
					<Button size="xs" variant="ghost">
						Dismiss
					</Button>
					<Button size="xs">Ok</Button>
				</AlertAction>
			</Alert>
		</div>
	);
}
