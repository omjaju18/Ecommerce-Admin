'use client'

// Import necessary modules and components
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiAlert } from "@/components/ui/api-alert";

import { columns, CategoryColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

// Define the props for the CategoriesClient component
interface CategoriesClientProps {
    data: CategoryColumn[]; // Data for category columns
}

// Define the CategoriesClient component
export const CategoriesClient: React.FC<CategoriesClientProps> = ({
    data
}) => {
    const params = useParams(); // Retrieve URL parameters
    const router = useRouter(); // Access Next.js router

    return (
        <>
            {/* Render the heading and 'Add New' button */}
            <div className="flex items-center justify-between">
                <Heading title={`Categories (${data.length})`} description="Manage categories for your store" />

                {/* Button to add a new category */}
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />

            {/* Render the data table for categories */}
            <DataTable searchKey="name" columns={columns} data={data} />
            
            {/* Render a heading for API calls */}
            <Heading title="API" description="API Calls for Categories" />
            <Separator />
            {/* Render a list of API calls for categories */}
            <ApiList entityName="categories" entityIdName="categoryId" />
        </>
    );
};
