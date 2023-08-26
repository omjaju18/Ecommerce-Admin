import prismadb from "@/lib/prismadb";

import { BillboardForm } from "./components/billboard-form"; 

// Define an asynchronous React component called BillboardPage.
const BillboardPage = async ({
    params
}: {
    params: { billboardId: string }
}) => {
    // Use the Prismadb to fetch a unique billboard based on the provided billboardId.
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {/* Render the BillboardForm component with the fetched billboard data. */}
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    );
}

export default BillboardPage;
