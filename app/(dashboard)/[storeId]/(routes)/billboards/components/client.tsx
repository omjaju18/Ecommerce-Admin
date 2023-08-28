"use client"; 

import { Plus } from "lucide-react"; // Import the Plus icon from the Lucide library
import { useParams, useRouter } from "next/navigation"; // Import the useParams and useRouter hooks from the next/navigation library

import { Button } from "@/components/ui/button"; // Import the Button component from the specified path
import { DataTable } from "@/components/ui/data-table"; // Import the DataTable component from the specified path
import { Heading } from "@/components/ui/heading"; // Import the Heading component from the specified path
import { Separator } from "@/components/ui/separator"; // Import the Separator component from the specified path
import { ApiList } from "@/components/ui/api-list"; // Import the ApiList component from the specified path

import { columns, BillboardColumn } from "./columns"; // Import the 'columns' and 'BillboardColumn' from a local file named 'columns'

// Define the props for the BillboardClient component
interface BillboardClientProps {
    data: BillboardColumn[]; // Data is expected to be an array of BillboardColumn objects
}

// Define the BillboardClient component as a React functional component
export const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    // Get route parameters and router for navigation
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                {/* Display a heading with the number of billboards */}
                <Heading title={`Billboards (${data.length})`} description="Manage billboards for your store" />
                {/* Display a button to add a new billboard */}
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            {/* Display a separator */}
            <Separator />
            {/* Display a data table with search functionality */}
            <DataTable searchKey="label" columns={columns} data={data} />
            {/* Display a heading for API calls */}
            <Heading title="API" description="API Calls for Billboards" />
            {/* Display a separator */}
            <Separator />
            {/* Display a list of API calls related to billboards */}
            <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
    );
};
