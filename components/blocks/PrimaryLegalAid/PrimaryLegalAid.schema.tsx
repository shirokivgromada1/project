import { Template } from "tinacms";

export const primaryLegalAidSchema: Template = {
  name: "PrimaryLegalAid",
  label: "Primary Legal Aid",
  ui: {
    previewSrc: "/blocks/PrimaryLegalAid/primary-legal-aid-image.jpg",
    defaultItem: {
      title: "Первинна правова допомога",
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
      label: "Aid",
      name: "aid",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
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
          type: "image",
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
