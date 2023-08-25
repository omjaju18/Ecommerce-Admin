import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
//import { ThemeToggle } from "@/components/theme-toggle";

import prismadb from "@/lib/prismadb";

const Navbar = async () => {
    // Authenticate the user using Clerk.js
    const { userId } = auth();

    // If the user is not authenticated, redirect them to the sign-in page.
    if (!userId) {
        redirect('/sign-in');
    }

    // Use Prisma to fetch stores associated with the authenticated user.
    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                {/* Render a store switcher component with the fetched stores. */}
                <StoreSwitcher items={stores} />

                {/* Render the main navigation component. */}
                <MainNav className="mx-6" />

                {/* Render theme toggle and user button components. */}
                <div className="ml-auto flex items-center space-x-4">
                    {/* <ThemeToggle /> */}
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;


