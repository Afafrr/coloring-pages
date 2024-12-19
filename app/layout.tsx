import type { Metadata } from "next";
import "./styles/globals.css";
export const metadata: Metadata = {
  title: "Kolorowanki dla dzieci",
  description: "Kolorowanki dla dzieci",
};
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";
import { CookiesProvider } from "next-client-cookies/server";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" style={{ overflowX: "hidden" }}>
      <body>
        <CookiesProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
