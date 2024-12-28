"use client";
import { Container, Typography } from "@mui/material";
import CheckoutForm from "./_components/CheckoutForm";
import React, { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { priceCalc } from "@/app/utils/priceCalculation";
import { AppContext } from "@/app/_context/imagesContext";

if (process.env.NEXT_PUBLIC_TRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("PUBLIC KEY not defined");
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_TRIPE_PUBLISHABLE_KEY as string,
  { locale: "pl" }
);
function CheckoutPage() {
  // const { images } = useContext(AppContext);
  const images = [2, 3, 4, 5, 6];
  const { subcurrencyPrice, displayPrice } = priceCalc(images.length);
  console.log(subcurrencyPrice);

  return (
    <Container className="App">
      <Typography>{displayPrice} zł</Typography>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: subcurrencyPrice,
          currency: "pln",
        }}
      >
        <CheckoutForm imagesNumber={images.length} />
      </Elements>
    </Container>
  );
}

export default CheckoutPage;
