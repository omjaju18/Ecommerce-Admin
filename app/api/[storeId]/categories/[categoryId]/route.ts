import { NextResponse } from "next/server"; // Import NextResponse from Next.js
import { auth } from "@clerk/nextjs"; // Import authentication functionality

import prismadb from "@/lib/prismadb"; // Import the Prismadb client

// Handler for GET request
export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 }); // Return a bad request response if categoryId is missing
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category); // Return the retrieved category as JSON
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 }); // Return an internal server error response on error
  }
}

// Handler for DELETE request
export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth(); // Get the authenticated user's ID

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 }); // Return a forbidden response if the user is not authenticated
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 }); // Return a bad request response if categoryId is missing
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

    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category); // Return the deleted category as JSON
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 }); // Return an internal server error response on error
  }
}

// Handler for PATCH request
export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth(); // Get the authenticated user's ID

    const body = await req.json(); // Parse the request body

    const { name, billboardId } = body; // Destructure name and billboardId from the request body

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 }); // Return a forbidden response if the user is not authenticated
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 }); // Return a bad request response if billboardId is missing
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 }); // Return a bad request response if name is missing
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 }); // Return a bad request response if categoryId is missing
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

    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category); // Return the updated category as JSON
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 }); // Return an internal server error response on error
  }
}
