import { Alert } from "@mui/material";
import { AlertColor } from "@mui/material";

function CustomAlert({
  message,
  severity,
}: {
  message: string;
  severity: AlertColor;
}) {
  return (
    <Alert
      severity={severity}
      variant="filled"
      sx={{
        display: "flex",
        alignItems: "center",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        position: "absolute",
        zIndex: 100,
      }}
    >
      {message}
    </Alert>
  );
}

export default CustomAlert;
