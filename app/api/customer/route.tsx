import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripeInstance } from "@/app/utils/stripeInstance";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const { data } = await stripeInstance.customers.search({
      query: `email:'${email}'`,
    });
    const customer = data[0]?.id;
    //check if customer already exists
    if (data.length) {
      return NextResponse.json({ customer });
    }
    const name = email.split("@")[0];
    //create new customer
    const newCustomer = await stripeInstance.customers.create({ name, email });

    return NextResponse.json({ customer: newCustomer });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
