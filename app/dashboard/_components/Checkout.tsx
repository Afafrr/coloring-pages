"use client";
import {
  Box,
  Button,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { AppContext } from "@/app/_context/imagesContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { priceCalc } from "@/app/utils/priceCalculation";
import config from "@/config";
const { MIN_IMAGES_REQUIRED } = config;

function Checkout() {
  const { palette } = useTheme();
  const router = useRouter();
  const { images } = useContext(AppContext);
  const isBelowLimit = images.length < MIN_IMAGES_REQUIRED;

  return (
    <Paper
      variant="elevation"
      elevation={2}
      sx={{
        position: { xs: "fixed", md: "relative" },
        bottom: "0px",
        left: { xs: "0px", md: "auto" },
        width: { xs: "100%", md: "250px", lg: "300px" },
        minHeight: { xs: "80px", md: "auto" },
        p: { xs: 1, md: 2 },
        pt: { md: "30px" },
        backgroundColor: palette.primary.main,
        textShadow: "2px 2px 1px grey",
        color: "#ffffff",
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          alignItems: { xs: "center", md: "start" },
          justifyContent: "space-between",
          position: "sticky",
          top: "20px",
        }}
      >
        <Box sx={{ pl: "10px" }}>
          <Typography
            variant="h3"
            fontWeight={400}
            sx={{
              display: "block",
              top: "10px",
            }}
          >
            Koszyk
          </Typography>
          <PriceComp />
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: { sm: "10px", md: "0px" },
              flexDirection: { xs: "row", md: "column" },
              mt: { xs: "5px", md: "15px" },
              color: "black",
            }}
          >
            <Box>
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
            </Box>
            <Box sx={{ alignSelf: { xs: "end", md: "auto" } }}>
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
          </Box>
        </Box>
        <Tooltip
          title={
            isBelowLimit
              ? `Minimalna ilośc obrazów to ${MIN_IMAGES_REQUIRED}`
              : "Przejdź do kupna"
          }
        >
          <Box
            sx={{
              position: "relative",
              height: { xs: "80px", md: "50px" },
              width: { xs: "100px", md: "100%" },
              left: { xs: "auto", md: "50%" },
              transform: { xs: "auto", md: "translateX(-50%)" },
              mt: { xs: "0px", md: "20px" },
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              disabled={isBelowLimit}
              onClick={() => router.push("/checkout")}
              sx={{
                width: "100%",
                height: "100%",
                color: "white",
                backgroundColor: "black",
                "&.Mui-disabled": {
                  backgroundColor: "grey",
                  color: "lightgrey",
                },
              }}
            >
              Kup
            </Button>
          </Box>
        </Tooltip>
      </Box>
    </Paper>
  );
}

export default Checkout;

function PriceComp() {
  const { images } = useContext(AppContext);
  const price = priceCalc(images.length);

  const isBelowLimit = images.length < MIN_IMAGES_REQUIRED;

  const Price = () => (
    <>
      <Typography
        variant="body2"
        fontWeight={500}
        sx={{ display: { xs: "block", sm: "inline" } }}
      >
        {isBelowLimit ? "Niewystarczająca ilośc produktów" : "Cena produktów: "}
      </Typography>
      <Typography
        variant="body2"
        fontWeight={500}
        sx={{ display: { xs: "block", sm: "inline" } }}
      >
        {isBelowLimit ? "" : price + " zł"}
      </Typography>
    </>
  );

  return (
    <Box sx={{ mt: "15px" }}>{images.length ? <Price /> : <EmptyCart />}</Box>
  );
}

const EmptyCart = () => <Typography>Dodaj produkt</Typography>;
