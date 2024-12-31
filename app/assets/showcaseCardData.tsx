import elza from "@/public/Home/showcase/elza.jpg";
import shrek from "@/public/Home/showcase/shrek.jpg";
import spiderman from "@/public/Home/showcase/spiderman.jpg";
import cars from "@/public/Home/showcase/cars.jpg";
import harry from "@/public/Home/showcase/harry-potter (1).jpg";
import scooby from "@/public/Home/showcase/scoobydoo.jpg";
import { StaticImageData } from "next/image";

export type CardProps = {
  title: string;
  description: string;
  image1: StaticImageData;
  image2: StaticImageData;
  alt1: string;
  alt2: string;
};

export const showcaseCardsData: CardProps[] = [
  {
    title: "Ożyw swoje ulubione postacie z bajek",
    description:
      "Pokoloruj magiczną księżniczkę i stwórz swoją własną zimową krainę! Tutaj wszystko zależy od Twojej wyobraźni.",
    image1: elza,
    image2: shrek,
    alt1: "Książka o zwierzęciu",
    alt2: "Film o zwierzęciu",
  },
  {
    title: "Odkrywaj magiczne miejsca",
    description:
      "Możesz wymyślić własną scenerię, gdzie będzie rozgrywać się historia.",
    image1: cars,
    image2: scooby,
    alt1: "Książka o zwierzęciu",
    alt2: "Film o zwierzęciu",
  },
  {
    title: "Nie tylko bajki!",
    description: "Sky is the limit! Możesz pokolorować co tylko chcesz!",
    image1: harry,
    image2: spiderman,
    alt1: "Książka o zwierzęciu",
    alt2: "Film o zwierzęciu",
  },
];
