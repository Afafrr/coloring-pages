import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { ImageObj } from "@/types";
import { Grid2 } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Dispatch, SetStateAction, useState } from "react";

export default function CardImage({
  imageObj,
  handleDelete,
}: {
  imageObj: ImageObj;
  handleDelete: (id: string) => void;
}) {
  const [zoom, setZoom] = useState(false);
  //increasing zIndex on zoom click
  const [zIndex, setZIndex] = useState(false);
  //state used to change zIndex after width transition ends
  const [transitionEnd, setTransitionEnd] = useState(false);

  return (
    <Grid2 size={1}>
      <Box
        onMouseLeave={() => {
          setZoom(false);
          setTransitionEnd(true);
        }}
        onTransitionEnd={() =>
          transitionEnd && (setZIndex(false), setTransitionEnd(false))
        }
        sx={{
          position: "relative",
          flex: 1,
          width: zoom ? "140%" : "100%",
          aspectRatio: "3/4",
          borderRadius: "5px",
          zIndex: zIndex ? 500 : 100,
          "&:hover .overlay": zoom
            ? {
                display: "none",
              }
            : {
                opacity: 1,
                display: "flex",
              },
          transition: "width 0.3s, zoom 0.3s",
        }}
      >
        <Overlay
          imageObj={imageObj}
          handleDelete={handleDelete}
          zoomState={{ zoom, setZoom }}
          setZIndex={setZIndex}
        />
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

//Shows overlay on hover of an image
function Overlay({
  imageObj,
  handleDelete,
  zoomState,
  setZIndex,
}: {
  imageObj: ImageObj;
  handleDelete: (id: string) => void;
  zoomState: { zoom: boolean; setZoom: Dispatch<SetStateAction<boolean>> };
  setZIndex: Dispatch<SetStateAction<boolean>>;
}) {
  const { palette } = useTheme();
  const { zoom, setZoom } = zoomState;
  return (
    <Box
      className="overlay"
      sx={{
        display: "none",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        width: "100%",
        height: "100%",
        p: "10px",
        borderRadius: "5px",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(2px)",
        zIndex: 10,
      }}
    >
      <Typography sx={{ color: "white", overflow: "hidden" }}>
        {imageObj.inputText}
      </Typography>
      <Box
        sx={{
          display: "flex",
          height: { xs: "50px", sm: "auto" },
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
        <Tooltip title="Powiększ">
          <Button
            variant="contained"
            onClick={() => (setZoom(!zoom), setZIndex(true))}
            sx={{
              flex: 1,
              minWidth: "5px",
              color: "black",
              backgroundColor: "#eeeeee",
            }}
          >
            <ZoomInIcon />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
