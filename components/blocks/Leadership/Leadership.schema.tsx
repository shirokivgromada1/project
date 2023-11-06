import { Template } from "tinacms";

export const leadershipComponentSchema: Template = {
  name: "leadership",
  label: "Leadership",
  ui: {
    previewSrc: "/blocks/SingleProjectRMSI/single-project-rmsi.jpg",
    defaultItem: {
      title: "Лідерство та управління",
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
      label: "Addition",
      name: "addition",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.additionTitle };
        },
      },
      fields: [
        {
          label: "Title",
          name: "additionTitle",
          type: "string",
        },
        {
          label: "Description",
          name: "additionDescription",
          type: "string",
        },
        {
          label: "Download",
          name: "additionDownload",
          type: "object",
          fields: [
            {
              label: "File",
              name: "file",
              type: "image",
            },
            {
              label: "URL",
              name: "url",
              type: "string",
            },
            {
              label: "Button text",
              name: "buttonText",
              type: "string",
            },
          ],
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
