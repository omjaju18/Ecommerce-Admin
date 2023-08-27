"use client"

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// Define the type representing the structure of a billboard
export type BillboardColumn = {
    id: string;
    label: string;
    createdAt: string;
}

// Define an array of column definitions for the table
export const columns: ColumnDef<BillboardColumn>[] = [
    {
        // Define the data source for this column
        accessorKey: "label",
        // Define the header label for this column
        header: "Label",
    },
    {
        // Define the data source for this column
        accessorKey: "createdAt",
        // Define the header label for this column
        header: "Date",
    },
    {
        // Define a special column for displaying actions
        id: "actions",
        // Define how the cell content should be rendered for this column
        cell: ({ row }) => <CellAction data={row.original} />
    },
];
