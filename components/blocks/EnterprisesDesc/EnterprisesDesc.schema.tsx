import { Template } from "tinacms";

export const enterprisesDescComponentSchema: Template = {
  name: "EnterprisesDesc",
  label: "Enterprises Description",
  ui: {
    previewSrc: "/blocks/EnterprisesDesc/enterprises-desc.jpg",
    defaultItem: {
      title: "КУ “Агенція розвитку Широківської громади”",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "image",
      label: "Person photo",
      name: "image",
    },
    {
      type: "string",
      label: "Person fullname",
      name: "fullname",
    },
    {
      type: "object",
      label: "Schedule",
      name: "schedule",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Time",
          name: "time",
        },
      ],
    },
    {
      type: "object",
      label: "Contacts",
      name: "contacts",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Email",
          name: "email",
        },
        {
          type: "string",
          label: "Phone",
          name: "phone",
        },
        {
          type: "string",
          label: "Place",
          name: "place",
        },
      ],
    },
    {
      type: "object",
      label: "Position",
      name: "position",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Position name",
          name: "name",
        },
      ],
    },

    {
      type: "rich-text",
      label: "Description",
      name: "desc",
    },
  ],
};
