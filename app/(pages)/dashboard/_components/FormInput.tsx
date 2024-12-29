"use client";
import {
  FormControl,
  Box,
  TextField,
  Button,
  useMediaQuery,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PopularBtns from "./PopularBtns";
import { generateImage } from "@/app/actions/replicateActions";
import { AiResponse } from "@/types";
import { useTheme } from "@mui/material/styles";
import Modal from "./Modal";
import LimitInfo from "./LimitInfo";
import CustomAlert from "./CustomAlert";
import { AppContext } from "@/app/_context/imagesContext";
import ImagesContainer from "../../_components/ImagesContainer";

export function FormInput({ limit }: { limit: number }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { images, setImages } = useContext(AppContext);

  //effects for managing localStorage
  useEffect(() => {
    setImages(JSON.parse(localStorage.getItem("images") || "[]"));
  }, [setImages]);
  useEffect(() => {
    localStorage.setItem("images", JSON.stringify(images));
  }, [images]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length < 50) setInput(e.target.value);
  }

  async function handleClick() {
    setIsLoading(true);
    setShowModal(false);
    setError("");
    const response = await generateImage(input, images.length);
    const { data, error } = response as {
      data: AiResponse | null;
      error: string;
    };

    if (error || !data)
      setError((error as string) || "Wystąpił nieznany problem");
    else {
      const { id, url, inputText } = data;
      const imageObj = { id, url, inputText };
      setImages([...images, imageObj]);
    }
    setIsLoading(false);
  }

  //if text length shorter than 3, then emptyInputHandler is fired
  function emptyInputHandler() {
    setShowModal(true);
  }

  function handleDeleteClick(id: string) {
    setImages(images.filter((images) => images.id !== id));
  }

  return (
    <>
      {error && <CustomAlert severity="error" message={error} />}
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
              disabled={isLoading}
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
              onClick={input.length > 3 ? handleClick : emptyInputHandler}
              variant="contained"
              disabled={isLoading}
            >
              Generuj
            </Button>
            <LimitInfo curNum={images.length} limit={limit} />
          </Box>
        </Box>
      </FormControl>
      <Typography variant="subtitle2" sx={{ mt: "10px" }}>
        Obrazy są przechowywane do 24h!
      </Typography>
      <ImagesContainer images={images} handleDeleteClick={handleDeleteClick} />
      <Modal
        showModal={showModal}
        handleClose={handleClose}
        handleClick={handleClick}
        input={input}
      />
    </>
  );
}
