import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { StaticImageData } from "next/image";
import styles from "../styles/home.module.css";

type cardProps = {
  image1: StaticImageData;
  image2: StaticImageData;
  alt1: string;
  alt2: string;
};
function ShowcaseCard({ images }: { images: cardProps }) {
  const { image1, image2, alt1, alt2 } = images;

  return (
    <Box
      className={styles.scrollAnimation}
      sx={{
        display: "flex",
        transform: "translateY(-10px)",
      }}
    >
      <Card
        sx={{
          height: "auto",
          aspectRatio: "3/4",
          width: { xs: "150px", md: "175px" },
          position: "relative",
          transform: "translateX(20px) rotate(-8deg)",
          zIndex: 10,
          transition: "scale 0.5s ease-in-out, box-shadow 0.1s ease-in-out",
          "&:hover": {
            boxShadow: 3,
            transform: "scale(1.01) translateX(20px) rotate(-8deg)",
          },
        }}
      >
        <Image fill src={image1} alt={alt1} sizes="150px" quality={1} />
      </Card>
      <Card
        sx={{
          position: "relative",
          transform: "translateX(-20px) rotate(10deg)",
          height: "auto",
          width: { xs: "150px", md: "175px" },
          transition: "scale 0.5s ease-in-out, box-shadow 0.1s ease-in-out",
          "&:hover": {
            boxShadow: 3,
            transform: "scale(1.01) translateX(-20px) rotate(10deg)",
          },
        }}
      >
        <Image fill src={image2} alt={alt2} sizes="150px" quality={10} />
      </Card>
    </Box>
  );
}

export default ShowcaseCard;
