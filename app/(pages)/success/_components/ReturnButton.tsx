"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

function ReturnButton() {
  const router = useRouter();
  return (
    <Button variant="contained" onClick={() => router.push("/checkout")}>
      Wróć
    </Button>
  );
}

export default ReturnButton;
