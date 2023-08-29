"use client";

import { ColumnDef } from "@tanstack/react-table";

// Import the CellAction component for actions
import { CellAction } from "./cell-action";

// Define the shape of a ColorColumn
export type ColorColumn = {
    id: string;
    name: string;
    value: string;
    createdAt: string;
};

// Define the columns for the data table
export const columns: ColumnDef<ColorColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
        // Customize the cell rendering to display color value and a color swatch
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                {row.original.value}
                <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.value }} />
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        // Render the CellAction component for actions on each row
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
