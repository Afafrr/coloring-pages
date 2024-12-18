"use client";
import { Container, Paper, Typography } from "@mui/material";
import { Shadows_Into_Light_Two } from "next/font/google";
import { useRouter } from "next/navigation";

const comic = Shadows_Into_Light_Two({
  subsets: ["latin"],
  weight: ["400"],
});

function Navbar() {
  const router = useRouter();
  return (
    <Paper
      square
      elevation={1}
      sx={{
        position: "absolute",
        top: "0px",
        height: "40px",
        width: "100%",
        backgroundColor: "#efecea",
        left: "0px",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography
          onClick={() => router.push("/")}
          fontSize={"20px"}
          sx={{
            pl: { xs: "10px", md: "20px" },
            textShadow: "1px 1px 3px #BA55D3",
            cursor: "pointer",
          }}
          className={`${comic.className} `}
        >
          KOLOROWANKI.ART
        </Typography>
        <Typography
          sx={{ position: "relative", right: { xs: "0px", md: "300px" } }}
        >
          asd
        </Typography>
      </Container>
    </Paper>
  );
}

export default Navbar;
