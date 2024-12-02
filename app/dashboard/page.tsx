import { Typography, Box, Container } from "@mui/material";
import { FormInput } from "./_components/FormInput";
import config from "@/config";
export default async function Page() {
  return (
    <Container maxWidth="lg" sx={{ mx: { xs: "3px", md: "20px" } }}>
      <Box sx={{ mx: "auto", m: { xs: "10px", md: "20px" } }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Stwórz kolorowankę
        </Typography>
        <Typography sx={{ maxWidth: "600px", width: "100%", mt: "20px" }}>
          Możesz wpisać nazwę postaci, czynność jaką ma robić, scenerię w jakiej
          ma się znajdować i wiele innych!
        </Typography>
        <FormInput limit={config.IMAGE_LIMIT} />
      </Box>
    </Container>
  );
}
