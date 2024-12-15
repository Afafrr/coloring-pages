"use client";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import { AppContext } from "@/app/_context/imagesContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

function Checkout() {
  const { palette } = useTheme();
  const router = useRouter();

  return (
    <Paper
      variant="elevation"
      elevation={2}
      sx={{
        position: { xs: "fixed", md: "relative" },
        width: { xs: "100%", md: "250px", lg: "300px" },
        minHeight: { xs: "100px", md: "auto" },
        bottom: "0px",
        left: { xs: "0px", md: "auto" },
        p: 2,
        pt: { md: "30px" },
        backgroundColor: palette.primary.main,
        textShadow: "2px 2px 1px grey",
        color: "#ffffff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          justifyContent: "space-between",
          position: "sticky",
          top: "20px",
        }}
      >
        <Box>
          <Typography
            variant="h3"
            fontWeight={400}
            sx={{
              display: { xs: "none", md: "block" },
              top: "10px",
            }}
          >
            Koszyk
          </Typography>
          <PriceComp />
          <Box sx={{ mt: "15px", color: "black" }}>
            <Typography
              fontSize="13px"
              sx={{ mt: "0px", lineHeight: "15px" }}
              fontWeight={300}
            >
              Cena zależy od ilości:
            </Typography>
            <Typography
              fontSize="13px"
              sx={{ mt: "0px", lineHeight: "15px" }}
              fontWeight={300}
            >
              min. 2 obrazy
            </Typography>
            <Typography
              fontSize="13px"
              sx={{ mt: "0px", lineHeight: "15px" }}
              fontWeight={300}
            >
              3 obrazy - 10% zniżki
            </Typography>
            <Typography
              fontSize="13px"
              sx={{ mt: "0px", lineHeight: "15px" }}
              fontWeight={300}
            >
              4 obrazy - 20% zniżki
            </Typography>
            <Typography
              fontSize="13px"
              sx={{ mt: "0px", lineHeight: "15px" }}
              fontWeight={300}
            >
              5 obrazów - 30% zniżki
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push("/checkout")}
            sx={{
              position: "relative",
              height: { xs: "100px", md: "50px" },
              width: { xs: "120px", md: "100%" },
              left: { xs: "auto", md: "50%" },
              transform: { xs: "auto", md: "translateX(-50%)" },
              mt: { xs: "0px", md: "20px" },
              color: "white",
              backgroundColor: "black",
            }}
          >
            Kup
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default Checkout;

function PriceComp() {
  const { images } = useContext(AppContext);

  const Price = () => (
    <>
      <Typography variant="body2" fontWeight={500} sx={{ display: "inline" }}>
        Cena produktów:{' '}
      </Typography>
      <Typography variant="body2" fontWeight={500} sx={{ display: "inline" }}>
         20 zł
      </Typography>
    </>
  );

  return (
    <Box sx={{ mt: "15px" }}>
      {images.length + 1 ? <Price /> : <EmptyCart />}
    </Box>
  );
}

const EmptyCart = () => <Typography>Dodaj produkt</Typography>;
