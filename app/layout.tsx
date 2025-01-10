import type { Metadata } from "next";
import "./styles/globals.css";
export const metadata: Metadata = {
  title: "Koloruj.art – Twórz Kolorowanki dla Dzieci z AI | Kreatywna Zabawa",
  description:
    "Odkryj Koloruj.art – platformę do tworzenia unikalnych kolorowanek dla dzieci dzięki sztucznej inteligencji! Personalizowane wzory, które rozwijają kreatywność i zapewniają wyjątkową zabawę.",
};
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";
import { CookiesProvider } from "next-client-cookies/server";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

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
        <Analytics />
      </body>
    </html>
  );
}
