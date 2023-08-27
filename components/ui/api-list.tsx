"use client";


import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";

// Define the props for the ApiList component
interface ApiListProps {
    entityName: string;       // Name of the entity (e.g., "billboards")
    entityIdName: string;     // Name of the entity's ID (e.g., "billboardId")
}

// Define the ApiList component as a functional component
export const ApiList: React.FC<ApiListProps> = ({
    entityName,
    entityIdName,
}) => {
    // Get route parameters and origin
    const params = useParams();
    const origin = useOrigin();

    // Construct the base URL for API endpoints
    const baseUrl = `${origin}/api/${params.storeId}`;

    return (
        <>
            {/* Render API alerts for different HTTP methods and variants */}
            {/* GET endpoint to retrieve a list of entities */}
            <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`} />

            {/* GET endpoint to retrieve a specific entity by ID */}
            <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />

            {/* POST endpoint to create a new entity */}
            <ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}`} />

            {/* PATCH endpoint to update a specific entity by ID */}
            <ApiAlert title="PATCH" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />

            {/* DELETE endpoint to delete a specific entity by ID */}
            <ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
        </>
    );
};
