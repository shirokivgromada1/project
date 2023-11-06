import { Template } from "tinacms";

export const silradaPreviewPagesComponentSchema: Template = {
  name: "silradaPreview",
  label: "Silrada Preview",
  ui: {
    previewSrc: "/blocks/Silrada/SilradaPreview/silradaPreview.png",
  },
  fields: [
    {
      type: "image",
      name: "silradaImage",
      label: "Silrada Image",
    },
    {
      type: "string",
      name: "fullName",
    },
  ],
};
