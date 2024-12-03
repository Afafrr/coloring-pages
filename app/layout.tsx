import type { Metadata } from "next";
import "./styles/globals.css";
export const metadata: Metadata = {
  title: "Kolorowanki dla dzieci",
  description: "Kolorowanki dla dzieci",
};
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" style={{ overflowX: "hidden" }}>
      <body>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
