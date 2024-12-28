"use client";
import { useState, useEffect, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Input } from "@mui/material";
import CustomAlert from "../../dashboard/_components/CustomAlert";
import { useCookies } from "next-client-cookies";

function CheckoutForm({ imagesNumber }: { imagesNumber: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const cookies = useCookies();
  const userEmail = cookies.get("email") ?? "";

  useEffect(() => {
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
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }
    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setMessage(submitError.message || "Wystąpił nieznany błąd.");
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
      {clientSecret && (
        <PaymentElement
          id="payment-element"
          options={{ defaultValues: { billingDetails: { email: userEmail } } }}
        />
      )}
      <Button
        variant="contained"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        type="submit"
      >
        {isLoading ? "Loading..." : "Zapłać"}
      </Button>
      {message && <CustomAlert message={message} severity="error" />}
    </form>
  );
}

export default CheckoutForm;
