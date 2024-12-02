import { Box, Typography, Chip, useTheme } from "@mui/material";

type State = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function PopularBtns({ state }: { state: State }) {
  const { input, setInput } = state;
  const { palette } = useTheme();
  const trendingSet = new Set([
    "bluey",
    "swinka peppa",
    "Spiderman",
    "Elza",
    "Cocomelon",
    "minionki",
  ]);

  return (
    <Box
      sx={{
        display: { xs: "block", sm: "flex" },
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: "0.7rem", fontWeight: "400", mr: "5px" }}>
        Popularne:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "noWrap",
          gap: "5px",
          height: "50px",
          overflowX: "auto",
          py: "8px",
        }}
      >
        {[...trendingSet].map((item) => (
          <Chip
            key={item}
            label={item}
            onClick={() =>
              setInput(input.length > 0 ? input + " " + item : item)
            }
            size="small"
            variant="outlined"
            sx={{
              fontSize: "0.7rem",
              fontWeight: "400",
              height: "100%",
              "&:hover": { color: palette.secondary.main },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
