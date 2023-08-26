import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

// Define a GET request handler function.
export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    // Check if the billboardId parameter is missing.
    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    // Query the database to find a unique billboard based on the provided billboardId.
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    // Return the retrieved billboard as a JSON response.
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    // Handle internal errors and return an appropriate response.
    return new NextResponse("Internal error", { status: 500 });
  }
}

// Define a DELETE request handler function.
export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    // Authenticate the user.
    const { userId } = auth();

    // Check for unauthenticated user.
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // Check if the billboardId parameter is missing.
    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    // Query the database to find the store associated with the authenticated user.
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    // If no store is found, return an unauthorized response.
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    // Delete the specified billboard from the database.
    const billboard = await prismadb.billboard.delete({
      where: {
        id: params.billboardId,
      },
    });

    // Return the deleted billboard as a JSON response.
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    // Handle internal errors and return an appropriate response.
    return new NextResponse("Internal error", { status: 500 });
  }
}

// Define a PATCH request handler function.
export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    // Authenticate the user.
    const { userId } = auth();

    // Parse the request body.
    const body = await req.json();
    const { label, imageUrl } = body;

    // Check for unauthenticated user.
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // Check if label or imageUrl is missing.
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    // Check if the billboardId parameter is missing.
    if (!params.billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    // Query the database to find the store associated with the authenticated user.
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    // If no store is found, return an unauthorized response.
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    // Update the specified billboard in the database with new label and imageUrl.
    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    // Return the updated billboard as a JSON response.
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    // Handle internal errors and return an appropriate response.
    return new NextResponse("Internal error", { status: 500 });
  }
}
