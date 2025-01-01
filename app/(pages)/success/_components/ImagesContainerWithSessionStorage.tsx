"use client";
import { ImageObj } from "@/types";
import ImagesContainer from "../../_components/ImagesContainer";
import { useEffect, useState } from "react";

function ImagesContainerWithSessionStorage({ images: passedImages }: { images: ImageObj[] }) {
  const [images, setImages] = useState<ImageObj[]>(
    passedImages[0].url ? passedImages : []
  );

  useEffect(() => {
    if (passedImages[0].url) {
      sessionStorage.setItem("images", JSON.stringify(passedImages));
    } else {
      const images = JSON.parse(sessionStorage.getItem("images") as string);
      setImages(images);
    }
  }, [passedImages]);

  return (
    <ImagesContainer
      images={images || []}
      columns={{ xs: 2, sm: 3, md: 4, lg: 5 }}
      variant="download"
    />
  );
}

export default ImagesContainerWithSessionStorage;
