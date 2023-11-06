import { Template } from "tinacms";

export const previewComponentSchema: Template = {
  name: "preview",
  label: "Preview",
  ui: {
    previewSrc: "/blocks/Home/Preview/preview.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      type: "image",
      label: "Preview Image",
      name: "previewImage",
    },
    {
      type: "object",
      label: "News",
      name: "freshNews",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: "News Item" };
        },
      },
      fields: [
        {
          label: "News",
          name: "news",
          type: "reference",
          collections: ["news"],
        },
      ],
    },
  ],
};
