import { ReactNode } from "react";
import { AppContextProvider } from "@/app/_context/imagesContext";

const layout = ({ children }: { children: ReactNode }) => {
  return <AppContextProvider>{children}</AppContextProvider>;
};

export default layout;
