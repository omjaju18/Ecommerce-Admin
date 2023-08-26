import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

/**
 * Handle POST request to create a store.
 *
 * @param {Request} req - The incoming HTTP request.
 * @returns {NextResponse} - A NextResponse object representing the HTTP response.
 */
export async function POST(req: Request) {
    try {
        // Authenticate the user
        const { userId } = auth();

        // Parse the JSON request body
        const body = await req.json();

        // Extract the 'name' field from the request body
        const { name } = body;

        // Check if the user is authenticated
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        // Check if 'name' is provided in the request body
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        // Create a new store in the database
        const store = await prismadb.store.create({
            data: {
                name,
                userId,
            }
        });

        // Return a JSON response with the created store
        return NextResponse.json(store);
    } catch (error) {
        // Log internal errors and return a 500 Internal Server Error response
        console.error('[STORES_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
