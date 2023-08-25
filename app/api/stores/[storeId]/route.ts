import { NextResponse } from "next/server"; 
import { auth } from "@clerk/nextjs"; 

import prismadb from "@/lib/prismadb"; 

// Define an async function to handle HTTP PATCH requests
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {

  try {
    const { userId } = auth(); // Get the user ID from the authentication module
    const body = await req.json(); // Parse the JSON body of the request

    const { name } = body; // Extract the 'name' property from the request body

    // Check if the user is not authenticated, and return a 403 Forbidden response if not
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // Check if the 'name' property is missing in the request body, and return a 400 Bad Request response if so
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // Check if the 'storeId' parameter is missing, and return a 400 Bad Request response if so
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Update the store information in the database based on the store ID and user ID
    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId, // Store ID passed as a parameter
        userId, // User ID from authentication
      },
      data: {
        name, // Update the 'name' property in the store
      },
    });

    // Return a JSON response with the updated store information
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    // Return a 500 Internal Server Error response in case of an error
    return new NextResponse("Internal error", { status: 500 });
  }
}

// Define an async function to handle HTTP DELETE requests
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try { 
    const { userId } = auth(); // Get the user ID from the authentication module

    // Check if the user is not authenticated, and return a 403 Forbidden response if not
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // Check if the 'storeId' parameter is missing, and return a 400 Bad Request response if so
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Delete the store from the database based on the store ID and user ID
    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId, // Store ID passed as a parameter
        userId, // User ID from authentication
      },
    });

    // Return a JSON response with the deleted store information
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    // Return a 500 Internal Server Error response in case of an error
    return new NextResponse("Internal error", { status: 500 });
  }
}
