import { Template } from "tinacms";

export const investmentComponentSchema: Template = {
  name: "Investment",
  label: "Investment",
  ui: {
    previewSrc: "/blocks/Investment/investment.jpg",
    defaultItem: {
      title: "ІНВЕСТИЦІЇ",
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
      label: "Subtitle",
      name: "subtitle",
    },
    {
      type: "image",
      label: "Image",
      name: "image",
    },
    {
      type: "rich-text",
      label: "First text block",
      name: "firstText",
    },
    {
      type: "rich-text",
      label: "Second text block",
      name: "secondText",
    },
    {
      type: "string",
      label: "Invest title",
      name: "investTitle",
    },
    {
      type: "object",
      label: "Invest button",
      name: "button",
      fields: [
        {
          type: "string",
          label: "Button text",
          name: "text",
        },
        {
          type: "string",
          label: "URL",
          name: "url",
        }
      ]
    },
  ],
};
