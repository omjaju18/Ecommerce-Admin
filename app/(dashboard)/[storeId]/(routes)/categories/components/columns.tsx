"use client"

// Import necessary modules and components
import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

// Define the structure of a CategoryColumn object
export type CategoryColumn = {
    id: string;            // Unique identifier for the category
    name: string;          // Name of the category
    billboardLabel: string; // Label of the associated billboard
    createdAt: string;     // Formatted creation date
};

// Define the columns configuration for the table
export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",       // Accessor key for the 'name' field
        header: "Name",            // Header label for the 'name' column
    },
    {
        accessorKey: "billboard",  // Accessor key for the 'billboard' field
        header: "Billboard",       // Header label for the 'billboard' column
        cell: ({ row }) => row.original.billboardLabel, // Custom cell rendering to display the billboard label
    },
    {
        accessorKey: "createdAt",  // Accessor key for the 'createdAt' field
        header: "Date",            // Header label for the 'createdAt' column
    },
    {
        id: "actions",             // Unique identifier for the actions column
        // Custom cell rendering to display action buttons using the CellAction component
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
