"use client";
import { Box, Container, Typography, useTheme } from "@mui/material";
import CheckoutForm from "./_components/CheckoutForm";
import React, { useContext } from "react";
import { AppContext } from "@/app/_context/imagesContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { priceCalc } from "@/app/utils/priceCalculation";
import Navbar from "../dashboard/_components/Navbar";

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
  const { palette, typography } = useTheme();

  return (
    <>
      <Navbar showEmail={false} />
      <Container
        className="App"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: "10px",
          pt: "50px",
        }}
      >
        <Box sx={{ flex: 1, maxWidth: "sm", width: "100%" }}>
          <Typography variant="h4" sx={{ my: "5px" }}>
            Twoje obrazy
          </Typography>
        </Box>
        <Box sx={{ flex: 1, maxWidth: "sm", width: "100%" }}>
          <Typography variant="h4" sx={{ my: "5px" }}>
            Wybierz metodę płatności
          </Typography>
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: subcurrencyPrice,
              currency: "pln",
              appearance: {
                variables: {
                  colorPrimary: palette.primary.main,
                  fontSizeBase: typography.body1.fontSize?.toString(),
                },
              },
            }}
          >
            <CheckoutForm
              imagesNumber={images.length}
              displayPrice={displayPrice}
            />
          </Elements>
        </Box>
      </Container>
    </>
  );
}

export default CheckoutPage;
