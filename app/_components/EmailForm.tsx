"use client";
import { TextField, Box, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";

const schema = yup.object({
  email: yup
    .string()
    .email("Email nie jest odpowiedni")
    .required("Uzupełnij email by kontynuować"),
});

function EmailForm() {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "" },
  });
  const [error, setError] = useState(false);

  const onSubmit = (data: { email: string }) => {
    console.log(data);
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
              setError(!!errorInner);
            }, [errorInner]);

            return (
              <TextField
                label="Email"
                placeholder="xyz@gmail.com"
                {...field}
                error={!!errorInner}
                helperText={errorInner?.message}
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
        <Button
          type="submit"
          variant="outlined"
          sx={{ width: "100%", p: "13px 60px" }}
        >
          Przejdź dalej
        </Button>
      </Box>
    </form>
  );
}

export default EmailForm;
