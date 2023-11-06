import { Template } from "tinacms";

export const officiallyComponentSchema: Template = {
  name: "Officially",
  label: "Officially",
  ui: {
    previewSrc: "/blocks/Officially/officially.jpg",
    defaultItem: {
      title: "Офіційно",
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
      label: "Official",
      name: "official",
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
          label: "Rich text",
          name: "richText",
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
