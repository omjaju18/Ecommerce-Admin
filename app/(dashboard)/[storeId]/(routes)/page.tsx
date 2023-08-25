
import prismadb from "@/lib/prismadb"

// Define the props interface for the DashboardPage component.
interface DashboardPageProps {
    params: { storeId: string }
}

// Define the DashboardPage component as an asynchronous functional component.
const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    // Fetch store data based on the provided storeId parameter.
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })

    return (
        <div>
            {/* Display the name of the active store if available. */}
            Active Store: {store?.name}
        </div>
    )
}

export default DashboardPage
