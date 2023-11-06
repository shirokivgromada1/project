import { Template } from "tinacms";

export const aboutInstitutionsComponentSchema: Template = {
  name: "AboutInstitutions",
  label: "About Institutions",
  ui: {
    previewSrc: "/blocks/AboutInstitutions/about-institutions.jpg",
  },
  fields: [
    {
      type: "image",
      label: "Image",
      name: "image",
    },
    {
      type: "string",
      label: "Culturals title",
      name: "cultTitle",
    },
    {
      type: "object",
      label: "Culturals Insitutions",
      name: "culturals",
      list: true,
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "boolean",
          label: "Hidden",
          name: "hidden",
        },
      ],
    },
    {
      type: "string",
      label: "Educational title",
      name: "educTitle",
    },
    {
      type: "object",
      label: "Educational Insitutions",
      name: "educationals",
      list: true,
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "boolean",
          label: "Hidden",
          name: "hidden",
        },
      ],
    },
    {
      type: "string",
      label: "Pharmacies title",
      name: "pharTitle",
    },
    {
      type: "object",
      label: "Pharmacies",
      name: "pharmacies",
      list: true,
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
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
