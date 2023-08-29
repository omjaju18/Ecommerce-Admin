import { NextResponse } from "next/server"; // Import NextResponse from Next.js

import prismadb from "@/lib/prismadb"; // Import the Prismadb client
import { auth } from "@clerk/nextjs"; // Import authentication functionality

// Handler for POST request
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth(); // Get the authenticated user's ID

    const body = await req.json(); // Parse the request body

    const { name, value } = body; // Destructure name and value from the request body

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 }); // Return a forbidden response if the user is not authenticated
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 }); // Return a bad request response if name is missing
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 }); // Return a bad request response if value is missing
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

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(color); // Return the created color as JSON
  } catch (error) {
    console.log("[COLORS_POST]", error);
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

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors); // Return the retrieved colors as JSON
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return new NextResponse("Internal error", { status: 500 }); // Return an internal server error response on error
  }
}
