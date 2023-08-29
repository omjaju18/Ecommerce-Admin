"use client";

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

import { SizeColumn } from "./columns";

// Define the CellActionProps interface, specifying the expected data structure.
interface CellActionProps {
    data: SizeColumn;
}

// Define the CellAction component that displays actions for a size in a dropdown menu.
export const CellAction: React.FC<CellActionProps> = ({
    data,
}) => {
    // Get the router and params from the Next.js routing system.
    const router = useRouter();
    const params = useParams();

    // Define states for managing the modal and loading state.
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle the deletion of a size.
    const onConfirm = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);
            toast.success('Size deleted.');
            router.refresh();
        } catch (error) {
            toast.error('Make sure you removed all products using this size first.');
        } finally {
            setOpen(false);
            setLoading(false);
        }
    };

    // Handle copying the size ID to the clipboard.
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('Size ID copied to clipboard.');
    }

    return (
        <>
            {/* Alert modal for confirming the deletion of a size. */}
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            {/* Dropdown menu for size actions. */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {/* Button to trigger the dropdown menu. */}
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                {/* Content of the dropdown menu. */}
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {/* Option to copy the size ID to the clipboard. */}
                    <DropdownMenuItem
                        onClick={() => onCopy(data.id)}
                    >
                        <Copy className="mr-2 h-4 w-4" /> Copy Id
                    </DropdownMenuItem>
                    {/* Option to navigate to the update page for the size. */}
                    <DropdownMenuItem
                        onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    {/* Option to initiate the deletion of the size. */}
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
