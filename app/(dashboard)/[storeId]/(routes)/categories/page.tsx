// Import necessary modules and libraries
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { CategoryColumn } from "./components/columns";
import { CategoriesClient } from "./components/client";

// Define the CategoriesPage component as an asynchronous function
const CategoriesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    // Retrieve categories data from the database
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        // Include related 'billboard' data
        include: {
            billboard: true,
        },
        // Order categories by 'createdAt' field in descending order
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Format the retrieved categories data for rendering
    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        // Extract the 'label' field from the related 'billboard' data
        billboardLabel: item.billboard.label,
        // Format the 'createdAt' timestamp
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {/* Render the CategoriesClient component with the formatted data */}
                <CategoriesClient data={formattedCategories} />
            </div>
        </div>
    );
};

// Export the CategoriesPage component as the default export
export default CategoriesPage;
