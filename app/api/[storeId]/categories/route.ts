import { NextResponse } from "next/server"; // Import NextResponse from Next.js
import { auth } from "@clerk/nextjs"; // Import authentication functionality

import prismadb from "@/lib/prismadb"; // Import the Prismadb client

// Handler for POST request
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth(); // Get the authenticated user's ID

    const body = await req.json(); // Parse the request body

    const { name, billboardId } = body; // Destructure name and billboardId from the request body

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 }); // Return a forbidden response if the user is not authenticated
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 }); // Return a bad request response if name is missing
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 }); // Return a bad request response if billboardId is missing
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 }); // Return a bad request response if storeId is missing
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 }); // Return a method not allowed response if the user is not authorized
    }

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category); // Return the created category as JSON
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 }); // Return an internal server error response on error
  }
}

// Handler for GET request
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 }); // Return a bad request response if storeId is missing
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories); // Return the retrieved categories as JSON
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 }); // Return an internal server error response on error
  }
}
