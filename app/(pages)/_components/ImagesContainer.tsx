import { Card, Grid2 } from "@mui/material";
import CardImage from "../dashboard/_components/CardImage";
import { ImageObj } from "@/types";
import { Variant } from "../dashboard/_components/CardImage";

type Columns = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

function ImagesContainer({
  images,
  handleDeleteClick,
  columns,
  variant,
}: {
  images: ImageObj[];
  handleDeleteClick: (id: string) => void;
  columns: Columns;
  variant: Variant;
}) {
  return (
    <Card
      suppressHydrationWarning
      variant="outlined"
      sx={{
        position: "relative",
        minHeight: "375px",
        mt: "10px",
        padding: { xs: "8px", sm: "15px" },
        backgroundColor: "#ffffff",
      }}
    >
      <Grid2 container columns={columns} spacing={2}>
        {images.map((image) => (
          <CardImage
            key={image.id}
            imageObj={image}
            handleDelete={handleDeleteClick}
            variant={variant}
          />
        ))}
      </Grid2>
    </Card>
  );
}
export default ImagesContainer;
