import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { ImageObj } from "@/types";
import { Grid2 } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";

export default function CardImage({
  imageObj,
  handleDelete,
}: {
  imageObj: ImageObj;
  handleDelete: (id: string) => void;
}) {
  return (
    <Grid2 size={1}>
      <Box
        onClick={() => console.log("asd")}
        sx={{
          position: "relative",
          flex: 1,
          width: "100%",
          aspectRatio: "3/4",
          borderRadius: "5px",
          zIndex: 20,
          "&:hover .overlay": {
            opacity: 1,
          },
        }}
      >
        <Overlay imageObj={imageObj} handleDelete={handleDelete} />
        <Image
          priority
          fill
          src={imageObj.url}
          alt={`Image of ${imageObj.inputText}`}
          sizes="(max-width: 500px) 50vw, 50vw"
          style={{
            objectFit: "cover",
            borderRadius: "5px",
            boxShadow: "3px 3px 10px #bcbcbc",
            zIndex: 0,
          }}
        />
      </Box>
    </Grid2>
  );
}

function Overlay({
  imageObj,
  handleDelete,
}: {
  imageObj: ImageObj;
  handleDelete: (id: string) => void;
}) {
  const { palette } = useTheme();
  return (
    <Box
      className="overlay"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        width: "100%",
        height: "100%",
        p: "10px",
        borderRadius: "5px",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(2px)",
        transition: "opacity 0.15s",
        zIndex: 10,
        opacity: 0,
      }}
    >
      <Typography sx={{ color: "white", overflow: "hidden" }}>
        {imageObj.inputText}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: { xs: "10px", md: "5px" },
        }}
      >
        <Tooltip title="Usuń">
          <Button
            variant="contained"
            onClick={() => handleDelete(imageObj.id)}
            sx={{
              flex: 1,
              minWidth: "5px",
              backgroundColor: palette.warning.main,
              color: "#eeeeee",
            }}
          >
            <DeleteForeverIcon />
          </Button>
        </Tooltip>

        <Tooltip title="Pobierz">
          <Button
            variant="contained"
            sx={{
              flex: 1,
              minWidth: "5px",
              color: "black",
              backgroundColor: "#eeeeee",
            }}
          >
            <DownloadTwoToneIcon />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
