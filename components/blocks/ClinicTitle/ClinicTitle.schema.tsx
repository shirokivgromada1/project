import { Template } from "tinacms";

export const clinicTitleSchema: Template = {
  name: "ClinicTitle",
  label: "Clinic Title",
  ui: {
    previewSrc: "/blocks/ClinicTitle/clinic-title-image.jpg",
    defaultItem: {
      title: "КЛІНІКА СІМЕЙНИЙ ЛІКАР",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "image",
      label: "Title Logo",
      name: "logo",
    },
    {
      label: "Subtitle",
      name: "desc",
      type: "rich-text",
    },
    {
      label: "Button",
      name: "buttonText",
      type: "string",
    },
    {
      label: "Button URL",
      name: "url",
      type: "string",
    },
  ],
};
