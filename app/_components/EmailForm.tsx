"use client";
import { TextField, Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { manageCustomer } from "../actions/customerActions";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

const schema = yup.object({
  email: yup
    .string()
    .email("Email nie jest odpowiedni")
    .required("Uzupełnij email by kontynuować"),
});

function EmailForm() {
  const cookies = useCookies();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: cookies.get("email") || "" },
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async ({ email }: { email: string }) => {
    setIsLoading(true);
    const { error, customer } = await manageCustomer(email);
    console.log({ customer, error });
    if (error) {
      setError(error.toString() || "Wystąpił nieznany problem");
    }
    if (customer) {
      const date = new Date();
      //expire the cookie after 10 days
      const expirationDate = date.getDate() + 10;
      cookies.set("email", email, {
        secure: true,
        sameSite: "Strict",
        expires: expirationDate,
      });
      router.push("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ maxWidth: "290px", mt: { xs: "35px", md: "25px" } }}>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => {
            const errorInner = fieldState.error;
            useEffect(() => {
              setError(!!errorInner ? (errorInner?.message as string) : "");
            }, [errorInner]);

            return (
              <TextField
                label="Email"
                placeholder="xyz@gmail.com"
                {...field}
                error={Boolean(error)}
                helperText={error}
                size={"medium"}
                sx={{
                  width: "100%",
                  p: 0,
                  height: error ? "85px" : "70px",
                  transition: "height 0.15s",
                }}
              />
            );
          }}
        />
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            variant="outlined"
            disabled={isLoading}
            sx={{ width: "100%", p: "13px 60px" }}
          >
            Przejdź dalej
          </Button>
          {isLoading && (
            <CircularProgress
              color="primary"
              size="18px"
              sx={{
                position: "absolute",
                right: "-30px",
              }}
            />
          )}
        </Box>
      </Box>
    </form>
  );
}

export default EmailForm;
