import { Template } from "tinacms";

export const documentsComponentSchema: Template = {
  name: "Documents",
  label: "Documents",
  ui: {
    previewSrc: "/blocks/Documents/documents-image.jpg",
    defaultItem: {
      title: "Документи",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "object",
      label: "Document",
      name: "document",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.title };
        },
      },
      fields: [
        {
          label: "Title",
          name: "title",
          type: "string",
        },
        {
          label: "Link",
          name: "link",
          type: "string",
        },
        {
          label: "Hidden",
          name: "hidden",
          type: "boolean",
        },
      ],
    },
  ],
};
