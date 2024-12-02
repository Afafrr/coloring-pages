import { Container, Box, Typography } from "@mui/material";
import Image from "next/image";
import sunSvg from "@/public/Home/sunSvg.svg";
import mountainSvg from "@/public/Home/mountainSvg.svg";
import styles from "./styles/home.module.css";
import { Shadows_Into_Light_Two } from "next/font/google";
import NavButton from "./_components/NavButton";
import ShowcaseCard from "./_components/ShowcaseCard";
import { showcaseCardsData } from "./assets/showcaseCardData";

const comic = Shadows_Into_Light_Two({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <Box>
      <Box
        component="section"
        sx={{
          position: "relative",
          maxHeight: "100vh",
          height: "100%",
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
              variant="body1"
              sx={{ maxWidth: "600px", mt: "20px", fontWeight: "200" }}
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
          {showcaseCardsData.map((card, index) => {
            const isEven = index % 2 === 0;
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: `${isEven ? "row" : "row-reverse"}`,
                  },
                  justifyContent: `${isEven ? "start" : "end"}`,
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <ShowcaseCard images={card} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: `${isEven ? "start" : "end"}`,
                    textAlign: `${isEven ? "left" : "right"}`,
                    maxWidth: "500px",
                  }}
                >
                  <Typography variant="h4" color="primary">
                    {card.title}
                  </Typography>
                  <Typography variant="body2">{card.description}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
      <footer></footer>
    </Box>
  );
}
