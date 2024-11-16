"use client";
import {
  FormControl,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PopularBtns from "./PopularBtns";

export function FormInput() {
  const [input, setInput] = useState("");

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length < 50) setInput(e.target.value);
  }

  function handleClick() {
    console.log(input);
  }
  return (
    <>
      <FormControl
        sx={{
          display: "flex",
          gap: "10px",
          mt: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: { xs: "600px", md: "700px" },
          }}
        >
          <PopularBtns state={{ input, setInput }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "stretch" },
              gap: "10px",
              width: "100%",
            }}
          >
            <TextField
              id="outlined-multiline-static"
              label="Opis obrazka"
              value={input}
              onChange={handleOnChange}
              sx={{ width: "100%" }}
              multiline
              inputMode="text"
              placeholder="Elza tańcząca w krainie lodu..."
              rows={2}
            />
            <Button
              sx={{
                width: { xs: "100%", md: "150px" },
                minHeight: "45px",
                maxWidth: "400px",
                color: "#ffffff",
                textShadow: "1px 0px 5px #8e928e;",
              }}
              onClick={handleClick}
              variant="contained"
            >
              Generuj
            </Button>
          </Box>
        </Box>
      </FormControl>
      <Card
        variant="outlined"
        sx={{ width: "80%", height: "500px", backgroundColor: "lightgrey" }}
      >
        <Typography>asdasd</Typography>
      </Card>
    </>
  );
}
