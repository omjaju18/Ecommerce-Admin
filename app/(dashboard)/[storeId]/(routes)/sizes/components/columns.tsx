"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

// Define the structure of a SizeColumn, representing a size item.
export type SizeColumn = {
    id: string;        // Unique identifier for the size.
    name: string;      // Name of the size.
    value: string;     // Value associated with the size.
    createdAt: string; // Date when the size was created.
};

// Define the columns for the data table used to display sizes.
export const columns: ColumnDef<SizeColumn>[] = [
    {
        accessorKey: "name",   // The data property to display in this column.
        header: "Name",       // The column header text.
    },
    {
        accessorKey: "value",  // The data property to display in this column.
        header: "Value",      // The column header text.
    },
    {
        accessorKey: "createdAt", // The data property to display in this column.
        header: "Date",           // The column header text.
    },
    {
        // Define a custom "actions" column with a CellAction component.
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} /> // Render CellAction component for each row.
    },
];
