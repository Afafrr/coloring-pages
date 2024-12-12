"use client";
import { createContext, useState } from "react";
import { ReactNode } from "react";
import { ImageObj } from "@/types";
//one context for whole app -> passing info about images from dashboard,
//to checkout component and checkout page

type Context = {
  images: ImageObj[];
  setImages: React.Dispatch<React.SetStateAction<ImageObj[]>>;
};

export const AppContext = createContext<Context>({
  images: [],
  setImages: () => {},
});

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageObj[]>([]);
  return (
    <AppContext.Provider value={{ images, setImages }}>
      {children}
    </AppContext.Provider>
  );
}
