import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const { data } = await stripe.customers.search({
      query: `email:'${email}'`,
    });
    let customer = data[0]?.id;
    //check if customer already exists
    if (data.length) {
      return NextResponse.json({ customer });
    }
    const name = email.split("@")[0];
    //override customer var and create new one
    customer = await stripe.customers.create({ name, email });

    return NextResponse.json({ customer });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
