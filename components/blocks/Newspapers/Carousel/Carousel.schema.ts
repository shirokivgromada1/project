import { Template } from "tinacms";

export const newspapersCarouselComponentSchema: Template = {
  name: "newspapersCarousel",
  label: "Newspapers Carousel",
  ui: {
    previewSrc: "/blocks/Newspapers/Carousel/carousel.png",
  },
  fields: [{ name: "title", label: "Title", type: "string" }],
};
