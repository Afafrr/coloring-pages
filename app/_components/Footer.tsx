"use client";
import { Paper, Box, useTheme, Typography, Divider } from "@mui/material";
function Footer() {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: "100%",
        bottom: "0px",
        mt: "80px",
        py: "10px",
        color: palette.primary.main,
      }}
    >
      <Divider sx={{ position: "absolute", top: "0px", width: "100%" }} />
      <Typography variant="subtitle2" sx={{ justifySelf: "center" }}>
        Wszelkie prawa zastrzeżone © 2024
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          position: { xs: "relative", md: "absolute" },
          right: { xs: "0px", md: "20px" },
        }}
      >
        app4roach@gmail.com
      </Typography>
    </Box>
  );
}

export default Footer;
