"use client";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "500", "700"],
});

export const basicTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4CBB17",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#757575",
    },
    warning: {
      main: "#C70000",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontSize: "2.8rem",
      fontWeight: 200,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 200,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 200,
    },
    h4: {
      fontSize: "1.2rem",
      fontWeight: 200,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 300,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
  },
});

export const theme = responsiveFontSizes(basicTheme);
