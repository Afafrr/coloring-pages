import { Box, Container, Typography } from "@mui/material";
import Navbar from "./(pages)/dashboard/_components/Navbar";
import Footer from "./_components/Footer";
import ReturnButton from "./(pages)/success/_components/ReturnButton";

export default function NotFound() {
  return (
    <>
      <Navbar showEmail={false} />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          height: "100vh",
        }}
      >
        <Typography variant="h2" fontWeight={700}>
          Nie znaleziono
        </Typography>
        <Typography variant="body2">
          Strona o podanym adresie nie istnieje
        </Typography>
        <ReturnButton text="Wróć do strony głównej" path="/" />
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            bottom: "0px",
            left: "0px",
          }}
        >
          <Footer />
        </Box>
      </Container>
    </>
  );
}
