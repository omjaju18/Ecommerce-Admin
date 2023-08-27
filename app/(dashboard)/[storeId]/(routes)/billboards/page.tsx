// Import necessary modules and components
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns"
import { BillboardClient } from "./components/client";

// Define the BillboardsPage component as an asynchronous function
const BillboardsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    // Fetch billboards data from the database based on storeId and order them by creation date
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Format the retrieved billboard data into a specific format
    const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

    // Return the JSX for rendering the BillboardsPage component
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {/* Render the BillboardClient component and pass in the formatted billboard data */}
                <BillboardClient data={formattedBillboards} />
            </div>
        </div>
    );
};

// Export the BillboardsPage component as the default export
export default BillboardsPage;
