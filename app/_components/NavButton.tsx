"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const NavButton = ({
  text,
  direction,
}: {
  text: string;
  direction: string;
}) => {
  const router = useRouter();

  return (
    <Button
      variant="outlined"
      onClick={() => router.push(direction)}
      sx={{ mt: "20px" }}
    >
      {text}
    </Button>
  );
};

export default NavButton;
