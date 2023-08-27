'use client';

// Import necessary modules and components
import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/modals/alert-modal";

import { BillboardColumn } from "./columns";

// Define the props for the CellAction component
interface CellActionProps {
    data: BillboardColumn;
}

// Define the CellAction component as a functional component
export const CellAction: React.FC<CellActionProps> = ({
    data,
}) => {

    // Initialize router and params for navigation and state for modal and loading
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Function to handle billboard deletion
    const onConfirm = async () => {
        try {
            setLoading(true);

            // Send a DELETE request to delete the billboard
            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
            
            // Display a success message
            toast.success('Billboard deleted.');

            // Refresh the page
            router.refresh();
            
        } catch (error) {

            // Display an error message if deletion fails
            toast.error('Make sure you removed all categories using this billboard first.');
        } finally {

            // Close the modal and reset loading state
            setOpen(false);
            setLoading(false);
        }
    };

    // Function to copy the billboard ID to the clipboard
    const onCopy = (id: string) => {
        // Use the Clipboard API to copy the ID to the clipboard
        navigator.clipboard.writeText(id);
        // Display a success message
        toast.success('Billboard ID copied to clipboard.');
    }

    return (
        <>

            {/* Render an alert modal for confirmation */}
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />

            {/* Render a dropdown menu with actions */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>

                    {/* Render a button to open the menu */}
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">

                    {/* Render a label for the menu */}
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    {/* Render a menu item to copy the ID */}
                    <DropdownMenuItem
                        onClick={() => onCopy(data.id)}
                    >
                        <Copy className="mr-2 h-4 w-4" /> Copy Id
                    </DropdownMenuItem>

                    {/* Render a menu item to update the billboard */}
                    <DropdownMenuItem
                        onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>

                    {/* Render a menu item to delete the billboard */}
                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
