// Import necessary dependencies and components
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { SizeColumn } from "./components/columns";
import { SizesClient } from "./components/client";

// Define a page component for managing sizes
const SizesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    // Fetch size data from the database based on the provided storeId
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Format the retrieved size data into a specific structure (SizeColumn)
    const formattedSizes: SizeColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {/* Render the SizesClient component with the formatted size data */}
                <SizesClient data={formattedSizes} />
            </div>
        </div>
    );
};

// Export the SizesPage component as the default export
export default SizesPage;
