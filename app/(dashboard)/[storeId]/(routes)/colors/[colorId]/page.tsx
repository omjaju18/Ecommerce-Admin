import prismadb from "@/lib/prismadb";

import { ColorForm } from "./components/color-form";

// Define a page component that handles the Color page
const ColorPage = async ({
    params
}: {
    params: { colorId: string }
}) => {
    // Fetch the color data using the provided colorId
    const color = await prismadb.color.findUnique({
        where: {
            id: params.colorId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {/* Render the ColorForm component with the fetched color data */}
                <ColorForm initialData={color} />
            </div>
        </div>
    );
}

export default ColorPage;
