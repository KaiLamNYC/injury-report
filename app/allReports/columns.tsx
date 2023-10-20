"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Report = {
	patientName: string;
	timeOfInjury: Date;
	createdAt: Date;
};

export const columns: ColumnDef<Report>[] = [
	{
		accessorKey: "patientName",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Patient Name
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: "timeOfInjury",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Time of Injury
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Reported At
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
];
