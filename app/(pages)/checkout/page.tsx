"use client";
import { Box, Container, Typography, useTheme } from "@mui/material";
import CheckoutForm from "./_components/CheckoutForm";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { priceCalc } from "@/app/utils/priceCalculation";
import Navbar from "../dashboard/_components/Navbar";
import ImagesContainer from "../_components/ImagesContainer";
import { ImageObj } from "@/types";

if (process.env.NEXT_PUBLIC_TRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("PUBLIC KEY not defined");
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_TRIPE_PUBLISHABLE_KEY as string,
  { locale: "pl" }
);

function CheckoutPage() {
  const [images, setImages] = useState<ImageObj[]>([]);
  const [paymentIntent, setPaymentIntent] = useState(false);
  const { subcurrencyPrice, displayPrice } = priceCalc(images.length);
  const { palette, typography } = useTheme();

  useEffect(() => {
    setImages(JSON.parse(localStorage.getItem("images") || "[]"));
    setPaymentIntent(true);
  }, []);

  return (
    <>
      <Navbar showEmail={false} />
      <Container
        className="App"
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: { xs: "center", md: "start" },
          gap: "50px",
          pt: "60px",
        }}
      >
        <Box
          sx={{
            top: "0px",
            flex: 1,
            maxWidth: "sm",
            width: "100%",
          }}
        >
          <Typography variant="h4" sx={{ mb: "15px" }}>
            Twoje obrazy
          </Typography>
          <ImagesContainer
            variant="null"
            images={images}
            handleDeleteClick={() => {}}
            columns={{ xs: 2, sm: 3 }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            maxWidth: "sm",
            width: "100%",
            minHeight: { xs: "420px", sm: "350px", md: "340px" },
          }}
        >
          <Typography variant="h4" sx={{ mb: "15px" }}>
            Wybierz metodę płatności
          </Typography>
          {paymentIntent && (
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: subcurrencyPrice,
                currency: "pln",
                loader: "always",
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
          )}
        </Box>
      </Container>
    </>
  );
}

export default CheckoutPage;
