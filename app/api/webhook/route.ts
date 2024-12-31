import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripeInstance } from "@/app/utils/stripeInstance";
import { CustomerMetaStatus } from "@/types";

//stripe webhook checks if paymentIntent was successful, if so
//metadata of customer gets updated with purchased: true
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;
  let event: Stripe.Event;

  async function updateMeta(
    paymentIntent: Stripe.PaymentIntent,
    status: CustomerMetaStatus
  ) {
    await stripeInstance.customers.update(paymentIntent.customer as string, {
      metadata: {
        purchased: status,
      },
    });
  }

  try {
    event = stripeInstance.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!
    );
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      // update customer data
      await updateMeta(paymentIntent, "success");
      console.log(`${event.type} was successful:`, paymentIntent.id);

      return NextResponse.json("Payment succeeded", { status: 200 });
      //fullfil the purchase
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;
      await updateMeta(paymentIntent, "failed");
      console.error("Payment failed:", paymentIntent.last_payment_error);

      return NextResponse.json("Payment failed", { status: 400 });
    }
    return NextResponse.json("Payment not succeeded", { status: 400 });
  } catch (error) {
    return NextResponse.json("Invalid Signature", { status: 400 });
  }
}
