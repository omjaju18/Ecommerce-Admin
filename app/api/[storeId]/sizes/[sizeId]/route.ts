import { NextResponse } from "next/server"; // Import NextResponse from Next.js

import prismadb from "@/lib/prismadb"; // Import the Prismadb client
import { auth } from "@clerk/nextjs"; // Import authentication functionality

// Handler for GET request
export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 }); // Return a bad request response if sizeId is missing
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size); // Return the retrieved size as JSON
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Internal error", { status: 500 }); // Return an internal server error response on error
  }
}

// Handler for DELETE request
export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
) {
  try {
    const { userId } = auth(); // Get the authenticated user's ID

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 }); // Return a forbidden response if the user is not authenticated
    }

    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 }); // Return a bad request response if sizeId is missing
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

    const size = await prismadb.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size); // Return the deleted size as JSON
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 }); // Return an internal server error response on error
  }
}

// Handler for PATCH request
export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
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

    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 }); // Return a bad request response if sizeId is missing
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

    const size = await prismadb.size.update({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size); // Return the updated size as JSON
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 }); // Return an internal server error response on error
  }
}
