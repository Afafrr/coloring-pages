import type { Metadata } from "next";
import "./styles/globals.css";
export const metadata: Metadata = {
  title: "Kolorowanki dla dzieci",
  description: "Kolorowanki dla dzieci",
};
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";
import { CookiesProvider } from "next-client-cookies/server";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" style={{ overflowX: "hidden" }}>
      <body className={inter.className}>
        <CookiesProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
