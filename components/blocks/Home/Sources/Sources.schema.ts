import { Template } from "tinacms";

export const sourcesComponentSchema: Template = {
  name: "sources",
  label: "Sources",
  ui: {
    previewSrc: "/blocks/Home/Sources/sources.png",
    defaultItem: {
      title: "Ми надаємо такі послуги",
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
      label: "Source",
      name: "source",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.serviceTitle };
        },
      },
      fields: [
        {
          label: "Title",
          name: "sourceTitle",
          type: "string",
        },
        {
          label: "Icon",
          name: "sourceIcon",
          type: "image",
          ui: {
            validate: (value) => {},
          },
        },
        {
          label: "Link",
          name: "sourceLink",
          type: "string",
        },
      ],
    },
  ],
};
