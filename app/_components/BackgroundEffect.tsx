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
        display: { xs: "none", md: "block" },
        position: "fixed",
        top: "-100px",
        left: "-100px",
        height: "510px",
        width: "510px",
        borderRadius: "50%",
        backgroundColor: color,
        zIndex: "-100",
        filter: "blur(200px)",
      }}
    ></Box>
  );
}

export default BackgroundEffect;
