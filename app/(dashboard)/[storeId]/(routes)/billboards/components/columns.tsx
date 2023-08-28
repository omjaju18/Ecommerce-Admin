// Import necessary dependencies and components
"use client"; // This may be a custom import statement specific to your project

import { ColumnDef } from "@tanstack/react-table"; // Import the ColumnDef type from a library
import { CellAction } from "./cell-action"; // Import the CellAction component from a local file

// Define the shape of a Billboard column
export type BillboardColumn = {
    id: string; // Unique identifier for the billboard
    label: string; // Label associated with the billboard
    createdAt: string; // Date when the billboard was created
}

// Define the columns for the Billboard table
export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: "label", // Key to access the 'label' property in data
        header: "Label", // Header label for this column
    },
    {
        accessorKey: "createdAt", // Key to access the 'createdAt' property in data
        header: "Date", // Header label for this column
    },
    {
        id: "actions", // Identifier for this custom column
        cell: ({ row }) => <CellAction data={row.original} />, // Custom rendering function for the cell
    },
];
