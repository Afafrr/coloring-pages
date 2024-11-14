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
    <html lang="pl">
      <body>
        <ThemeProvider theme={theme}>
          <link
            rel="icon"
            href="@/public/favicon/favicon-kid.webp"
            sizes="any"
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
