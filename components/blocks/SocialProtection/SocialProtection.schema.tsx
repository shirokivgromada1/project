import { Template } from "tinacms";

export const socialProtectionSchema: Template = {
  name: "SocialProtection",
  label: "Social Protection",
  ui: {
    previewSrc: "/blocks/SocialProtection/social-protection-image.jpg",
    defaultItem: {
      body: "Соціальний захист",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      label: "Image",
      name: "image",
      type: "image",
    },
    {
      label: "Description",
      name: "desc",
      type: "rich-text",
    },
    {
      type: "object",
      label: "Links",
      name: "links",
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
          label: "Url",
          name: "url",
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
