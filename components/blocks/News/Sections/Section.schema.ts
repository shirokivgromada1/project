import { Template } from "tinacms";

export const newsSectionsComponentSchema: Template = {
  name: "newsSections",
  label: "News Sections",
  ui: {
    previewSrc: "/blocks/News/Sections/sections.png",
  },
  fields: [
    {
      type: "object",
      label: "Section",
      name: "newsSection",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.category };
        },
      },
      fields: [
        {
          label: "Category",
          name: "category",
          type: "reference",
          collections: ["newsCategories"],
        },
        {
          label: "Variant",
          name: "variantNews",
          type: "string",
          options: [
            { value: "1", label: "First variant" },
            { value: "2", label: "Second variant" },
            { value: "3", label: "Third variant" },
            { value: "4", label: "Fourth variant" },
          ],
        },
      ],
    },
  ],
};
