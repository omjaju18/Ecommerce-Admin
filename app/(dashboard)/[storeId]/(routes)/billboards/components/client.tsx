// Import necessary modules and components
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

// Import columns and BillboardColumn interface from "./columns"
import { columns, BillboardColumn } from "./columns";

// Define the props for the BillboardClient component
interface BillboardClientProps {
    data: BillboardColumn[];
}

// Define the BillboardClient component as a functional component
export const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    // Get the route parameters and router for navigation
    const params = useParams();
    const router = useRouter();

    // Render the BillboardClient component
    return (
        <>
            {/* Render the title and a button to add a new billboard */}
            <div className="flex items-center justify-between">
                <Heading title={`Billboards (${data.length})`} description="Manage billboards for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>

            {/* Render a separator */}
            <Separator />

            {/* Render a data table to display billboards */}
            <DataTable searchKey="label" columns={columns} data={data} />

            {/* Render a heading for the API section */}
            <Heading title="API" description="API Calls for Billboards" />

            {/* Render a separator */}
            <Separator />

            {/* Render a list of API calls related to billboards */}
            <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
    );
};
