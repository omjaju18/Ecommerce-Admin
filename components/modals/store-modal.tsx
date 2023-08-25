"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Button } from "@/components/ui/button";

// Define the validation schema for the form using Zod.
const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {
    // Initialize the store modal and router.
    const storeModal = useStoreModal();
    const router = useRouter();

    // State to track loading status.
    const [loading, setLoading] = useState(false);

    // Initialize the form with React Hook Form and the Zod resolver.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    // Define the form submission function.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            // Send a POST request to create a new store.
            const response = await axios.post('/api/stores', values);

            // Redirect to the newly created store page.
            window.location.assign(`/${response.data.id}`);
        } catch (error) {
            // Display an error toast if something goes wrong.
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        // Render a modal dialog for creating a store.
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories."
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <div className="space-y-2">
                        {/* Define a form for store creation. */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                {/* Define a form field for the store name. */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} placeholder="E-Commerce" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Buttons for canceling and submitting the form. */}
                                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                    <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>
                                        Cancel
                                    </Button>
                                    <Button disabled={loading} type="submit">Continue</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
