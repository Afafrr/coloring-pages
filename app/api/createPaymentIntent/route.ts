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

    const { imagesNumber } = await req.json();
    if (
      imagesNumber <= config.MIN_IMAGES_REQUIRED ||
      imagesNumber > config.IMAGE_LIMIT
    )
      return NextResponse.json({ error: "LIMIT OBRAZOW" }, { status: 400 });

    const { subcurrencyPrice } = priceCalc(imagesNumber);
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: subcurrencyPrice,
      currency: "pln",
      customer: customerId,
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
