import { Template } from "tinacms";

export const aboutTownsComponentSchema: Template = {
  name: "AboutTowns",
  label: "About Districts",
  ui: {
    previewSrc: "/blocks/AboutDistricts/about-districts.jpg",
  },
  fields: [
    {
      type: "rich-text",
      label: "Description",
      name: "desc",
    },
    {
      type: "object",
      label: "Districts",
      name: "districts",
      list: true,
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Villages",
          name: "towns",
        },
        {
          type: "boolean",
          label: "Hidden",
          name: "hidden",
        },
      ],
    },
  ],
};
