import { NextRequest, NextResponse } from "next/server";
import { stripeInstance } from "@/app/utils/stripeInstance";

// endpoint for stripes customer creation, if exists return customers id, otherwise create customer
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
    const newCustomer = await stripeInstance.customers.create({
      name,
      email,
      metadata: { purchased: "false" },
    });

    return NextResponse.json({ customer: newCustomer.id });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}