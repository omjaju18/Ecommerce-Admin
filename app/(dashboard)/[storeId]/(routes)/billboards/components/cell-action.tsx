
"use client"; 

import axios from "axios"; // Import Axios for making HTTP requests
import { useState } from "react"; // Import useState hook from React
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"; // Import icons from Lucide React library
import { toast } from "react-hot-toast"; // Import toast notifications
import { useParams, useRouter } from "next/navigation"; // Import the useParams and useRouter hooks from the next/navigation library

import { Button } from "@/components/ui/button"; // Import the Button component from the specified path
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import components related to dropdown menus
import { AlertModal } from "@/components/modals/alert-modal"; // Import the AlertModal component

import { BillboardColumn } from "./columns"; // Import the BillboardColumn type from a local file

// Define the props for the CellAction component
interface CellActionProps {
    data: BillboardColumn; // Data is expected to be a BillboardColumn object
}

// Define the CellAction component as a React functional component
export const CellAction: React.FC<CellActionProps> = ({
    data,
}) => {
    const router = useRouter(); // Access the router for navigation
    const params = useParams(); // Access route parameters
    const [open, setOpen] = useState(false); // State for controlling the visibility of the AlertModal
    const [loading, setLoading] = useState(false); // State for tracking loading state when deleting a billboard

    // Function to handle billboard deletion confirmation
    const onConfirm = async () => {
        try {
            setLoading(true); // Set loading state to true
            // Send a DELETE request to delete the billboard
            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
            toast.success('Billboard deleted.'); // Show success toast notification
            router.refresh(); // Refresh the router to update the UI
        } catch (error) {
            toast.error('Make sure you removed all categories using this billboard first.'); // Show error toast notification
        } finally {
            setOpen(false); // Close the confirmation modal
            setLoading(false); // Reset loading state
        }
    };

    // Function to copy the billboard ID to the clipboard
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id); // Copy the ID to the clipboard
        toast.success('Billboard ID copied to clipboard.'); // Show success toast notification
    }

    return (
        <>
            {/* AlertModal for billboard deletion confirmation */}
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            {/* Dropdown menu for billboard actions */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {/* Button to trigger the dropdown */}
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                {/* Dropdown menu content */}
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {/* Dropdown menu item to copy the billboard ID */}
                    <DropdownMenuItem
                        onClick={() => onCopy(data.id)}
                    >
                        <Copy className="mr-2 h-4 w-4" /> Copy Id
                    </DropdownMenuItem>
                    {/* Dropdown menu item to navigate to billboard update page */}
                    <DropdownMenuItem
                        onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    {/* Dropdown menu item to initiate billboard deletion */}
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
