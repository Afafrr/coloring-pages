import { NextRequest, NextResponse } from "next/server";
import { stripeInstance } from "@/app/utils/stripeInstance";
import { ImageObj } from "@/types";

// endpoint for stripes customer creation, if exists return customers id, otherwise create customer
// metadata of paymentIntent should have imageIds which is array of image ids
// metadata should have pattern: purchased key indicating status of purchase, rest is image ID as key and url as value
export async function POST(req: NextRequest) {
  try {
    const { paymentIntent: paymentIntentId } = await req.json();
    const paymentIntent = await stripeInstance.paymentIntents.retrieve(
      paymentIntentId
    );
    //errors
    if (!paymentIntent)
      throw new Error("Nie istnieje PaymentIntent z takim ID!");
    if (paymentIntent.status !== "succeeded")
      throw new Error(`Wystąpił problem z płatnością ${paymentIntent.status}`);
    if (!paymentIntent.customer) throw new Error("Nie ma takiego klienta");
    //retrieve customers metadata
    const customerId = paymentIntent.customer as string;
    const customer = await stripeInstance.customers.retrieve(customerId);
    if (customer.deleted) throw new Error("Klient nie istnieje!");

    const paymentIds = JSON.parse(paymentIntent.metadata.imageIds) as string[];
    //get paymentIntent's urls from customers metadata
    const boughtImagesArr: ImageObj[] = paymentIds.map((id) => ({
      id,
      url: customer.metadata[id],
      inputText: "",
    }));
    //clear customers metadata
    await stripeInstance.customers.update(customerId, {
      metadata: "",
    });

    return NextResponse.json({ images: boughtImagesArr }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
