"use client";
import { createTheme } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "500", "700"],
});

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00cc00",
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
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontSize: "2.5rem",
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
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "8px 16px",
        },
        outlinedPrimary: {
          color: "#ffff0",
          "&:hover": {
            backgroundColor: "#d6f5d6",
          },
        },
      },
    },
  },
});
