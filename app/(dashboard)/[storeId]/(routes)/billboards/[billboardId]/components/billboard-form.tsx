"use client";


import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Billboard } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import ImageUpload from "@/components/ui/image-upload"

// Define the schema for form validation using Zod
const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});

// Define the type for the form values based on the Zod schema
type BillboardFormValues = z.infer<typeof formSchema>

// Define the props for the BillboardForm component
interface BillboardFormProps {
    initialData: Billboard | null;
};

// Define the BillboardForm component
export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData
}) => {
    // Get the route parameters using Next.js hooks
    const params = useParams();
    const router = useRouter();

    // Define state variables
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Determine the title, description, toast message, and action based on whether initialData is provided
    const title = initialData ? 'Edit billboard' : 'Create billboard';
    const description = initialData ? 'Edit a billboard.' : 'Add a new billboard';
    const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.';
    const action = initialData ? 'Save changes' : 'Create';

    // Initialize the form using react-hook-form and ZodResolver for validation
    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    });

    // Define the form submission function
    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true);
            if (initialData) {

                // Update existing billboard data via an API endpoint
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
            } else {

                // Create a new billboard via an API endpoint
                await axios.post(`/api/${params.storeId}/billboards`, data);
            }

            // Refresh and navigate to the billboard list page on success
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
            toast.success(toastMessage);
        } catch (error: any) {

            // Display an error toast message on failure
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    // Define the function for handling billboard deletion
    const onDelete = async () => {
        try {

            setLoading(true);
            // Delete the billboard via an API endpoint
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);

            // Refresh and navigate to the billboard list page on success
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
            toast.success('Billboard deleted.');

        } catch (error: any) {
            // Display an error toast message if deletion fails
            toast.error('Make sure you removed all categories using this billboard first.');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            {/* Display an alert modal for confirming billboard deletion */}
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">

                {/* Display the form title and description */}
                <Heading title={title} description={description} />

                {/* Display a delete button if initialData is provided */}
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            {/* Display a separator */}
            <Separator />

            {/* Render the form using react-hook-form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

                    {/* Form field for uploading an image */}
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background image</FormLabel>
                                <FormControl>

                                    {/* Render an image upload component */}
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange('')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="md:grid md:grid-cols-3 gap-8">
                        {/* Form field for entering a label */}
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        {/* Render an input field for the label */}
                                        <Input disabled={loading} placeholder="Billboard label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Submit button */}
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
