import { Box, Tooltip, Typography } from "@mui/material";

export default function LimitInfo({
  curNum,
  limit,
}: {
  curNum: number;
  limit: number;
}) {
  return (
    <Tooltip title="Twoja maksymalna liczba obrazów">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Max</Typography>
        <Typography>
          {curNum}/{limit}
        </Typography>
      </Box>
    </Tooltip>
  );
}
