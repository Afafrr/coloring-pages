"use client";
import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { ImageObj } from "@/types";
import { Grid2 } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Dispatch, SetStateAction, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";

//dashboard mode changes Cards buttons to zoom and delete
//download has zoom and download buttons
//null turns off buttons
export type Variant = "dashboard" | "download" | "null";

export default function CardImage({
  imageObj,
  handleDelete,
  variant,
}: {
  imageObj: ImageObj;
  handleDelete?: (id: string) => void;
  variant: Variant;
}) {
  const [zoom, setZoom] = useState(false);
  //increasing zIndex on zoom click
  const [zIndex, setZIndex] = useState(false);
  //state used to change zIndex after width transition ends
  const [transitionEnd, setTransitionEnd] = useState(false);
  //based on Card 'mode' display different buttons
  const Buttons = () => {
    switch (variant) {
      case "null":
        return null;
      case "dashboard":
        return (
          <>
            <DeleteButton onClickAction={() => handleDelete?.(imageObj.id)} />
            <ZoomButton zoomState={{ zoom, setZoom }} setZIndex={setZIndex} />
          </>
        );
      case "download":
        return (
          <>
            <ZoomButton zoomState={{ zoom, setZoom }} setZIndex={setZIndex} />
            <DownloadButton onClickAction={() => downloadImage(imageObj.url)} />
          </>
        );
    }
  };

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
        {/* Overlay after hovering over image */}
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
            <Buttons />
          </Box>
        </Box>
        {/* End of overlay */}
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

// Buttons Components
function ZoomButton({
  zoomState,
  setZIndex,
}: {
  zoomState: { zoom: boolean; setZoom: Dispatch<SetStateAction<boolean>> };
  setZIndex: Dispatch<SetStateAction<boolean>>;
}) {
  const { zoom, setZoom } = zoomState;
  return (
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
  );
}

function DeleteButton({ onClickAction }: { onClickAction: () => void }) {
  const { palette } = useTheme();

  return (
    <Tooltip title="Usuń">
      <Button
        variant="contained"
        onClick={onClickAction}
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
  );
}

function DownloadButton({ onClickAction }: { onClickAction: any }) {
  const { palette } = useTheme();

  return (
    <Tooltip title="Pobierz">
      <Button
        variant="contained"
        onClick={onClickAction}
        sx={{
          flex: 1,
          minWidth: "5px",
          backgroundColor: palette.primary.main,
          color: "#eeeeee",
        }}
      >
        <DownloadIcon />
      </Button>
    </Tooltip>
  );
}

async function downloadImage(url: string) {
  try {
    // Fetch the image as a Blob
    const response = await fetch(url);
    const blob = await response.blob();
    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "kolorowanki.jpeg";
    // Trigger a click event to start the download
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
}
