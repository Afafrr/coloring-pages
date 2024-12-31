import { NextRequest, NextResponse } from "next/server";
import { stripeInstance } from "@/app/utils/stripeInstance";
import { priceCalc } from "@/app/utils/priceCalculation";
import config from "@/config";
import { cookies } from "next/headers";

// endpoint for stripe paymentIntent creation
// get customerId from cookies and calcualte the price
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const customerId = cookieStore.get("customerId")?.value as string;
    if (!customerId)
      return NextResponse.json({ error: "Brak klienta!" }, { status: 400 });
    const imagesIds: string[] = await req.json();

    if (
      imagesIds.length < config.MIN_IMAGES_REQUIRED ||
      imagesIds.length > config.IMAGE_LIMIT
    )
      return NextResponse.json({ error: "LIMIT OBRAZOW" }, { status: 400 });

    const { subcurrencyPrice } = priceCalc(imagesIds.length);
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: subcurrencyPrice,
      currency: "pln",
      customer: customerId,
      metadata: {
        imageIds: JSON.stringify(imagesIds),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
