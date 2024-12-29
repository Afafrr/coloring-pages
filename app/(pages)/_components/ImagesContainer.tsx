import { Card, Grid2 } from "@mui/material";
import CardImage from "../dashboard/_components/CardImage";
import { ImageObj } from "@/types";

function ImagesContainer({
  images,
  handleDeleteClick,
}: {
  images: ImageObj[];
  handleDeleteClick: (id: string) => void;
}) {
  return (
    <Card
      suppressHydrationWarning
      variant="outlined"
      sx={{
        minHeight: "400px",
        mt: "10px",
        padding: { xs: "8px", sm: "15px" },
        backgroundColor: "#ffffff",
      }}
    >
      <Grid2
        container
        columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 7 }}
        spacing={2}
      >
        {images.map((image) => (
          <CardImage
            key={image.id}
            imageObj={image}
            handleDelete={handleDeleteClick}
          />
        ))}
      </Grid2>
    </Card>
  );
}
export default ImagesContainer;
