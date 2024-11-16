import { Typography, Box } from "@mui/material";
import { FormInput } from "./_components/FormInput";

export default async function Page() {
  return (
    <Box sx={{ mx: { xs: "10px", md: "20px" } }}>
      <Box sx={{ m: { xs: "10px", md: "20px" } }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Stwórz kolorowankę
        </Typography>
        <Typography sx={{ maxWidth: "600px", width: "100%", mt: "20px" }}>
          Możesz wpisać nazwę postaci, czynność jaką ma robić, scenerię w jakiej
          ma się znajdować i wiele innych!
        </Typography>
        <FormInput />
      </Box>
    </Box>
  );
}
