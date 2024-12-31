"use client";
import { useEffect } from "react";

function ClearLocalStorage() {
  useEffect(() => {
    localStorage.setItem("images", "[]");
  }, []);

  return <></>;
}

export default ClearLocalStorage;
