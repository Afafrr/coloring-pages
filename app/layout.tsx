import type { Metadata } from "next";
import "./styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";
import { CookiesProvider } from "next-client-cookies/server";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Koloruj.art – Twórz Kolorowanki dla Dzieci z AI",
  description:
    "Odkryj Koloruj.art – platformę do tworzącą kolorowanki dla dzieci używając sztucznej inteligencji! Personalizowane wzory, które rozwijają kreatywność i zapewniają wyjątkową zabawę.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
  keywords:
    "kolorowanki, kolorowanki dla dzieci, kolorowanki AI, aplikacja do kolorowania dla dzieci, drukowalne kolorowanki, kolorowanki sztuczna inteligencja",
};

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
