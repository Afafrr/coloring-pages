"use client";
import { useState, useEffect, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Box, Button } from "@mui/material";
import CustomAlert from "../../dashboard/_components/CustomAlert";
import { useCookies } from "next-client-cookies";

function CheckoutForm({
  imagesNumber,
  displayPrice,
}: {
  imagesNumber: number;
  displayPrice: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stripeReady, setStripeReady] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const cookies = useCookies();
  const userEmail = cookies.get("email") ?? "";

  useEffect(() => {
    setStripeReady(false);
    fetch("/api/createPaymentIntent", {
      method: "POST",
      body: JSON.stringify({ imagesNumber }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setMessage(data.error);
        setClientSecret(data.clientSecret);
      });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setMessage("");
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }
    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setIsLoading(false);
      return;
    }

    await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_RUL}/success`,
      },
    });
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Box sx={{ minHeight: "300px", mt: "10px" }}>
        {clientSecret && (
          <PaymentElement
            onReady={() => setStripeReady(true)}
            id="payment-element"
            options={{
              defaultValues: { billingDetails: { email: userEmail } },
            }}
          />
        )}
      </Box>
      <Button
        variant="contained"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        type="submit"
        sx={{
          height: "44px",
          width: "100%",
          mt: "30px",
          textTransform: "none",
          fontWeight: 600,
          opacity: `${stripeReady ? 1 : 0}`,
          transition: "opacity 0.7s",
        }}
      >
        {isLoading ? "Ładowanie..." : `Zapłać ${displayPrice} zł`}
      </Button>
      {message && <CustomAlert message={message} severity="error" />}
    </form>
  );
}

export default CheckoutForm;
