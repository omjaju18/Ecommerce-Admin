'use client'

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, SizeColumn } from "./columns";

// Define the SizesClientProps interface, specifying the expected data structure.
interface SizesClientProps {
    data: SizeColumn[];
}

// Define the SizesClient component that displays a list of sizes.
export const SizesClient: React.FC<SizesClientProps> = ({
    data
}) => {
    // Get the router and params from the Next.js routing system.
    const params = useParams();
    const router = useRouter();

    return (
        <>
            {/* Display the heading with the number of sizes and a description. */}
            <div className="flex items-center justify-between">
                <Heading title={`Sizes (${data.length})`} description="Manage sizes for your products" />
                {/* Button to navigate to the page for adding a new size. */}
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            {/* Display a data table with search functionality for the list of sizes. */}
            <DataTable searchKey="name" columns={columns} data={data} />
            {/* Display a heading for API information. */}
            <Heading title="API" description="API Calls for Sizes" />
            <Separator />
            {/* Display a list of API calls for sizes. */}
            <ApiList entityName="sizes" entityIdName="sizeId" />
        </>
    );
};
