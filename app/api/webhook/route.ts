import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

// Handle incoming POST request from Stripe webhook
export async function POST(req: Request) {
  // Read the request body as text
  const body = await req.text();

  // Retrieve the Stripe signature from request headers
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    // Construct the Stripe event using the request body and signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    // Handle webhook signature verification error
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Extract address information from the Stripe session
  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;
  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];
  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  // Check if the webhook event is a "checkout.session.completed" event
  if (event.type === "checkout.session.completed") {
    // Update the corresponding order in the database as paid
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
      include: {
        orderItems: true,
      },
    });

    // Extract product IDs from the order items
    const productIds = order.orderItems.map((orderItem) => orderItem.productId);

    // Archive the purchased products in the database
    await prismadb.product.updateMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
      data: {
        isArchived: true,
      },
    });
  }

  // Respond to the webhook with a success status
  return new NextResponse(null, { status: 200 });
}
