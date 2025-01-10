"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

function ReturnButton({ text, path }: { text?: string; path?: string }) {
  const router = useRouter();
  const routerPath = path || "/checkout";
  return (
    <Button variant="contained" onClick={() => router.push(routerPath)}>
      {text || "Wróć"}
    </Button>
  );
}

export default ReturnButton;
