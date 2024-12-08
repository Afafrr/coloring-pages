import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { Card } from "@mui/material";
import styles from "../styles/home.module.css";
import { CardProps } from "../assets/showcaseCardData";

function ShowcaseCard({ card, index }: { card: CardProps; index: number }) {
  const { title, description, image1, image2, alt1, alt2 } = card;
  const isEven = index % 2 === 0;

  return (
    <Box
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
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Box>
  );
}

export default ShowcaseCard;
