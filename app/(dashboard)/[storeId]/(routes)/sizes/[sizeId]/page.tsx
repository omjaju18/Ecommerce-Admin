// Import the necessary dependencies and components
import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";

// Define a page component for managing sizes
const SizePage = async ({
    params
}: {
    params: { sizeId: string }
}) => {
    // Fetch size data from the database based on the provided sizeId
    const size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                {/* Render the SizeForm component with initialData */}
                <SizeForm initialData={size} />
            </div>
        </div>
    );
}

// Export the SizePage component as the default export
export default SizePage;
