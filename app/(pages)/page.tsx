import { Container, Box, Typography } from "@mui/material";
import Image from "next/image";
import sunSvg from "@/public/Home/sunSvg.svg";
import mountainSvg from "@/public/Home/mountainSvg.svg";
import styles from "../styles/home.module.css";
import { Shadows_Into_Light_Two } from "next/font/google";
import ShowcaseCard from "../_components/ShowcaseCard";
import { showcaseCardsData } from "../assets/showcaseCardData";
import Footer from "../_components/Footer";
import BackgroundEffect from "../_components/BackgroundEffect";
import EmailForm from "../_components/EmailForm";

const comic = Shadows_Into_Light_Two({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <Box>
      <BackgroundEffect color="#acecff" className={styles.backgroundEffect1} />
      <BackgroundEffect color="#feffac" className={styles.backgroundEffect2} />
      <Box
        component="section"
        sx={{
          position: "relative",
          maxHeight: "100vh",
          height: "100%",
          overflow: "hidden",
        }}
      >
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
          <Image
            src={sunSvg}
            alt="Rysunek słońca"
            className={styles.sunImage}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                display: "inline-block",
              }}
            >
              Kolorowanki inspirowane twoją
              <br />
              <Typography
                className={`${comic.className} ${styles.rainbowText}`}
                style={{
                  display: "inline-block",
                  padding: "5px",
                  textTransform: "uppercase",
                }}
                fontSize="inherit"
              >
                wyobraźnią
              </Typography>
            </Typography>

            <Typography
              variant="body2"
              sx={{ maxWidth: "600px", mt: "20px", fontWeight: "200" }}
            >
              Wpisz postać, scenę czy krajobraz, a sztuczna inteligencja
              wygeneruje dla ciebie obrazy
            </Typography>
            <EmailForm />
          </Box>
          <Image
            src={mountainSvg}
            alt="Rysunek gór"
            className={styles.mountainImage}
          />
        </Container>
      </Box>
      <Container
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          mt: { xs: "40px", md: "60px" },
        }}
      >
        <Typography variant="h2" fontWeight={500} sx={{ mt: "50px" }}>
          Kilka kliknięć, a wygenerujesz co chcesz.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            overflow: "hidden",
            mt: { xs: "60px", md: "100px" },
          }}
        >
          {showcaseCardsData.map((card, index) => (
            <ShowcaseCard key={index} card={card} index={index} />
          ))}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
