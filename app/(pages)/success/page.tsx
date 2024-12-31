import { Box, Container, Typography } from "@mui/material";
import ImagesContainer from "../_components/ImagesContainer";
import Navbar from "../dashboard/_components/Navbar";
import Footer from "@/app/_components/Footer";
import CustomAlert from "../dashboard/_components/CustomAlert";
import ReturnButton from "./_components/ReturnButton";
import ClearLocalStorage from "./_components/ClearLocalStorage";

async function Success({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent: string }>;
}) {
  //get paymentIntent id from search params
  const params = await searchParams;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_RUL}/api/fetch-content`,
    {
      method: "POST",
      body: JSON.stringify({
        paymentIntent: params["payment_intent"],
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  const { images, error } = data;

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      {!error && <ClearLocalStorage />}
      <Navbar showEmail={false} />
      <Box sx={{ pt: "60px" }}>
        {error ? (
          <>
            <CustomAlert message={error} severity="error" />
            <ReturnButton />
          </>
        ) : (
          <Typography variant="h3" fontWeight={500} sx={{ mb: "20px" }}>
            Oto twoje zakupy!
          </Typography>
        )}

        <ImagesContainer
          images={images || []}
          columns={{ xs: 2, sm: 3, md: 4, lg: 5 }}
          variant="download"
        />
        <Typography variant="body1" sx={{ mt: "30px" }}>
          Dziekujemy za korzystanie z serwisu
        </Typography>
      </Box>
      <Footer />
    </Container>
  );
}

export default Success;
