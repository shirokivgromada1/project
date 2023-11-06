import { Template } from "tinacms";

export const currentProgramsComponentSchema: Template = {
  name: "CurrentPrograms",
  label: "Current Programs",
  ui: {
    previewSrc: "/blocks/CurrentPrograms/current-programs.jpg",
    defaultItem: {
      title: "Діючі програми Широківської громади",
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
      label: "Program ",
      name: "program",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.name };
        },
      },
      fields: [
        {
          label: "Name",
          name: "name",
          type: "string",
        },
        {
          label: "Date",
          name: "date",
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
          label: "Button text",
          name: "buttonText",
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
