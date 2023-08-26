import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

// Define a POST request handler function.
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    // Check for missing label or imageUrl.
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    // Check for missing storeId.
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Find the store associated with the authenticated user.
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

    // Create a new billboard in the database.
    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    // Return the created billboard as JSON response.
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}



// Define a GET request handler function.
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Check for missing storeId.
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Retrieve billboards associated with the specified storeId.
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    // Return the retrieved billboards as a JSON response.
    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
