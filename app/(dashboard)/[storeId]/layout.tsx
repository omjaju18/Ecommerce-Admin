import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb';

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: { storeId: string }
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
            id: params.storeId,
            userId,
        }
    });

    // If no store is found, redirect the user to the homepage.
    if (!store) {
        redirect('/');
    }

    // Render the dashboard layout, including the Navbar and child components.
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
