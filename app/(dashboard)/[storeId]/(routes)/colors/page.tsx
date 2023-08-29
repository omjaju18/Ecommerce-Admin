import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ColorColumn } from "./components/columns"
import { ColorClient } from "./components/client";

// Define a page component that handles the Colors page
const ColorsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    // Fetch a list of colors for the specified store
    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Format the fetched colors data into the shape expected by the ColorClient component
    const formattedColors: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {/* Render the ColorClient component with the formatted colors data */}
                <ColorClient data={formattedColors} />
            </div>
        </div>
    );
};

export default ColorsPage;
