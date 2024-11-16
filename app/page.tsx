import { Container, Box, Typography } from "@mui/material";
import Image from "next/image";
import sunSvg from "@/public/Home/sunSvg.svg";
import mountainSvg from "@/public/Home/mountainSvg.svg";
import styles from "./styles/home.module.css";
import { Shadows_Into_Light_Two } from "next/font/google";
import NavButton from "./_components/NavButton";

const comic = Shadows_Into_Light_Two({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Image src={sunSvg} alt="Rysunek słońca" className={styles.sunImage} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            mb: "50px",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "inline-block",
            }}
          >
            Kolorowanki inspirowane twoją
          </Typography>
          <Typography
            className={`${comic.className} ${styles.rainbowText}`}
            variant="h1"
            sx={{
              display: "inline-block",
              p: "5px",
              textTransform: "uppercase",
            }}
          >
            wyobraźnią
          </Typography>
          <Typography
            sx={{ maxWidth: "600px", mt: "20px", fontWeight: "200" }}
            variant="h4"
          >
            Wpisz postać, scenę czy krajobraz, a sztuczna inteligencja
            wygeneruje dla ciebie obrazy
          </Typography>
          <NavButton />
          <Image
            src={mountainSvg}
            alt="Rysunek gór"
            className={styles.mountainImage}
          />
        </Box>
      </Container>
      <footer></footer>
    </div>
  );
}
