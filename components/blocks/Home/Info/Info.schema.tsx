import { Template } from "tinacms";

export const infoPagesComponentSchema: Template = {
  name: "infoPages",
  label: "Info Pages",
  ui: {
    previewSrc: "/blocks/Home/Info/info.png",
  },
  fields: [
    {
      type: "object",
      label: "List of Pages",
      name: "listInfoPages",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.pageTitle };
        },
      },
      fields: [
        {
          label: "Title",
          name: "pageTitle",
          type: "string",
        },
        {
          label: "Page",
          name: "page",
          type: "reference",
          collections: ["page"],
        },
        {
          label: "Image",
          name: "pageImage",
          type: "image",
        },
        {
          label: "Text",
          name: "pageText",
          type: "string",
        },
        {
          label: "Link",
          name: "pageLink",
          type: "string",
        },
      ],
    },
  ],
};
