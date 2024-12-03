import { Box } from "@mui/material";

function BackgroundEffect({
  color,
  className,
}: {
  color: string;
  className: string;
}) {
  return (
    <Box
      className={className}
      sx={{
        position: "fixed",
        top: "-100px",
        left: "-100px",
        height: { xs: "100px", md: "550px" },
        width: { xs: "100px", md: "550px" },
        borderRadius: "50%",
        backgroundColor: color,
        zIndex: "-100",
        filter: "blur(130px)",
      }}
    ></Box>
  );
}

export default BackgroundEffect;
