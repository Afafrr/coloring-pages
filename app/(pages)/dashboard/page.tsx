import { Typography, Box, Container } from "@mui/material";
import { FormInput } from "./_components/FormInput";
import config from "@/config";
import Checkout from "./_components/Checkout";
import Navbar from "./_components/Navbar";

export default async function Page() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: { xs: "auto", md: "flex" },
        gap: { md: "10px", xl: "50px" },
        minHeight: "100vh",
        height: "100%",
        width: "100%",
        px: 0,
        pr: { xs: "auto", md: "0px" },
      }}
    >
      <Navbar />
      <Box
        sx={{
          flex: 1,
          p: { xs: "10px", md: "20px" },
        }}
      >
        <Typography variant="h4" sx={{ mt: "50px" }}>
          Stwórz kolorowankę
        </Typography>
        <Typography sx={{ maxWidth: "600px", width: "100%", mt: "10px" }}>
          Możesz wpisać nazwę postaci, czynność jaką ma robić, scenerię w jakiej
          ma się znajdować i wiele innych!
        </Typography>
        <FormInput limit={config.IMAGE_LIMIT} />
      </Box>
      <Checkout />
    </Container>
  );
}
