import { Template } from "tinacms";

export const silradaDepartmentDescComponentSchema: Template = {
  name: "SilradaDepartmentDesc",
  label: "Silrada Description Department",
  ui: {
    previewSrc: "/blocks/SilradaDepartmentDesc/silrada-department-desc.jpg",
    defaultItem: {
      title: "Відділ освіти Широківської громади",
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
          label: "Phone",
          name: "phone",
        },
        {
          type: "string",
          label: "Email",
          name: "email",
        },
      ],
    },
    {
      type: "object",
      label: "Work place",
      name: "workplace",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
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
      label: "Powers",
      name: "powers",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Description",
          name: "desc",
        },
      ],
    },
  ],
};
