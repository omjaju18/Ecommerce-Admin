
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { SettingsForm } from "./components/setting-form";

// Define the SettingsPage component as an async function
const SettingsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    // Get the user ID from the authentication module
    const { userId } = auth();

    // Check if the user is not authenticated, and redirect them to the sign-in page if not
    if (!userId) {
        redirect('/sign-in'); // Redirect to the sign-in page
    }

    // Retrieve store information based on store ID and user ID from the database
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId, // Store ID passed as a parameter
            userId // User ID from authentication
        }
    });

    // If the store does not exist, redirect the user to the homepage
    if (!store) {
        redirect('/'); // Redirect to the homepage
    }

    // Render the SettingsPage component
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">

                {/* Render the SettingsForm component with initial data from the store */}
                <SettingsForm />
            </div>
        </div>
    );
}

// Export the SettingsPage component as the default export
export default SettingsPage;
