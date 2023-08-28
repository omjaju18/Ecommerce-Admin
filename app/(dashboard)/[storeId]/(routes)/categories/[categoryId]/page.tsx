// Import necessary modules and components
import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

// Define the CategoryPage component, which is an asynchronous function
const CategoryPage = async ({
    params
}: {
    params: { categoryId: string, storeId: string }
}) => {
    // Fetch the category data using the unique ID from the parameters
    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId
        }
    });

    // Fetch a list of billboards for the store using the store ID from the parameters
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    });

    // Render the CategoryForm component with billboards and initial category data
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {/* Render the CategoryForm component with billboards and initial category data */}
                <CategoryForm billboards={billboards} initialData={category} />
            </div>
        </div>
    );
}

export default CategoryPage;
