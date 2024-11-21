"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const NavButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      onClick={() => router.push("/dashboard")}
      sx={{ mt: "20px", p: "10px 60px" }}
    >
      Przejdź dalej
    </Button>
  );
};

export default NavButton;
