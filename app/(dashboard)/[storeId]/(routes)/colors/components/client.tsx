"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, ColorColumn } from "./columns";

// Define the props for the ColorClient component
interface ColorClientProps {
    data: ColorColumn[];
}

// Define the ColorClient component
export const ColorClient: React.FC<ColorClientProps> = ({
    data
}) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            {/* Display the heading for the Colors section */}
            
            <div className="flex items-center justify-between">

                <Heading title={`Colors (${data.length})`} description="Manage colors for your products" />

                {/* Add a button to navigate to the "Add New Color" page */}
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />

            {/* Display the data table for colors */}
            <DataTable searchKey="name" columns={columns} data={data} />

            {/* Display the heading for the API section */}
            <Heading title="API" description="API Calls for Colors" />

            <Separator />

            {/* Display the API list for colors */}
            <ApiList entityName="colors" entityIdName="colorId" />
        </>
    );
};
