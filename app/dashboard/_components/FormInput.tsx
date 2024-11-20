"use client";
import {
  FormControl,
  Box,
  TextField,
  Button,
  Card,
  Grid2,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import PopularBtns from "./PopularBtns";
import CardImage from "./CardImage";
import { useTheme } from "@mui/material/styles";
import { ImageObj } from "@/types";

const dummyData = [
  {
    id: "1",
    url: "https://replicate.delivery/czjl/F8wvvjeL6RzOEiVVwCgv1VOICxhB7yEH4a53aFPqYY6AAJ5JA/output.jpg",
    inputText: "Life blooms when kindness leads the way every single day",
  },
  {
    id: "2",
    url: "https://replicate.delivery/czjl/F8wvvjeL6RzOEiVVwCgv1VOICxhB7yEH4a53aFPqYY6AAJ5JA/output.jpg",
    inputText: "indness leads the way every single day Life blooms when k",
  },
];

export function FormInput() {
  const [input, setInput] = useState("");
  const [images, setImages] = useState<ImageObj[]>(dummyData);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length < 50) setInput(e.target.value);
  }

  async function handleClick() {
  }

  function handleDeleteClick(id: string) {
    setImages(images.filter((images) => images.id !== id));
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
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "stretch" },
              gap: { xs: "20px", md: "10px" },
              width: "100%",
              mt: { xs: "10px", md: "0px" },
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
              rows={smallScreen ? 3 : 2}
            />
            <Button
              sx={{
                width: { xs: "100%", sm: "150px" },
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
        sx={{
          minHeight: "500px",
          mt: "20px",
          padding: { xs: "8px", sm: "15px" },
          backgroundColor: "#ffffff",
        }}
      >
        <Grid2
          container
          columns={{ xs: 2, sm: 4, md: 5, lg: 7, xl: 9 }}
          spacing={2}
        >
          {images.map((image) => (
            <CardImage
              key={image.id}
              imageObj={image}
              handleDelete={handleDeleteClick}
            />
          ))}
        </Grid2>
      </Card>
    </>
  );
}
