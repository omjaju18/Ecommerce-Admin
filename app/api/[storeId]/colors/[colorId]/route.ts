import { NextResponse } from "next/server"; // Import NextResponse from Next.js
import { auth } from "@clerk/nextjs"; // Import authentication functionality

import prismadb from "@/lib/prismadb"; // Import the Prismadb client

// Handler for GET request
export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 }); // Return a bad request response if colorId is missing
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color); // Return the retrieved color as JSON
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Internal error", { status: 500 }); // Return an internal server error response on error
  }
}

// Handler for DELETE request
export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) {
  try {
    const { userId } = auth(); // Get the authenticated user's ID

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 }); // Return a forbidden response if the user is not authenticated
    }

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 }); // Return a bad request response if colorId is missing
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

    const color = await prismadb.color.delete({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color); // Return the deleted color as JSON
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 }); // Return an internal server error response on error
  }
}

// Handler for PATCH request
export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
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

    if (!params.colorId) {
      return new NextResponse("Color id is required", { status: 400 }); // Return a bad request response if colorId is missing
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

    const color = await prismadb.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color); // Return the updated color as JSON
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 }); // Return an internal server error response on error
  }
}
