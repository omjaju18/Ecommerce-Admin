"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";

//import { useOrigin } from "@/hooks/use-origin"; 


// Define a schema for the form using Zod
const formSchema = z.object({
    name: z.string().min(2), // Define validation rules for the 'name' field
});

// Define the type for form values based on the Zod schema
type SettingsFormValues = z.infer<typeof formSchema>;

// Define the props for the SettingsForm component
interface SettingsFormProps {
    initialData: Store; // Initial data for the form (Store type)
}

// Define the SettingsForm component
export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData,
}) => {
    const params = useParams();
    const router = useRouter();
    //const origin = useOrigin(); 

    const [open, setOpen] = useState(false); // State for the modal's open/close
    const [loading, setLoading] = useState(false); // State for loading state

    // Initialize the react-hook-form with resolver and default values
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema), // Use the Zod resolver for validation
        defaultValues: initialData, // Set default form values based on initialData
    });

    // Function to handle form submission
    const onSubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true); // Set loading state to true
            // Send a PATCH request to update the store data
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh(); // Refresh the page to reflect changes
            toast.success('Store updated.'); // Show a success toast
        } catch (error: any) {
            toast.error('Something went wrong.'); // Show an error toast
        } finally {
            setLoading(false); // Set loading state back to false
        }
    };

    // Function to handle store deletion
    const onDelete = async () => {
        try {
            setLoading(true); // Set loading state to true
            // Send a DELETE request to delete the store
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh(); // Refresh the page to reflect changes
            router.push('/'); // Redirect to the homepage
            toast.success('Store deleted.'); // Show a success toast
        } catch (error: any) {
            toast.error('Make sure you removed all products and categories first.'); // Show an error toast
        } finally {
            setLoading(false); // Set loading state back to false
            setOpen(false); // Close the modal
        }
    }

    // Render the SettingsForm component
    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                {/* Render the heading and a delete button */}
                <Heading title="Store settings" description="Manage store preferences" />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" /> {/* Render a Trash icon */}
                </Button>
            </div>
            <Separator /> {/* Render a separator */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        {/* Render an input field for the store name */}
                                        <Input disabled={loading} placeholder="Store name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator /> {/* Render another separator */}
            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                variant="public"
                description={`${origin}/api/${params.storeId}`}
            />
        </>
    );
};
