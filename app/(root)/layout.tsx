import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Authenticate the user using Clerk.js
    const { userId } = auth();

    // If the user is not authenticated, redirect them to the sign-in page.
    if (!userId) {
        redirect('/sign-in');
    }

    // Use Prisma to find the first store associated with the user.
    const store = await prismadb.store.findFirst({
        where: {
            userId,
        }
    });

    // If a store is found, redirect the user to the store's dashboard.
    if (store) {
        redirect(`/${store.id}`);
    }

    // Render the setup layout, which includes child components.
    return (
        <>
            {children}
        </>
    );
}
