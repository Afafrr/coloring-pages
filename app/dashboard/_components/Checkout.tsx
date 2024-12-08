"use client";
import { Box, Paper, Typography, useTheme } from "@mui/material";

function Checkout() {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        position: { xs: "fixed", md: "relative" },
        width: { xs: "100%", md: "250px", lg: "300px" },
        minHeight: { xs: "100px", md: "auto" },
        bottom: "0px",
        left: { xs: "0px", md: "auto" },
        backgroundColor: palette.primary.main,
      }}
    >
      <Typography variant="body1" sx={{ top: "0px" }}></Typography>
    </Box>
  );
}

export default Checkout;
