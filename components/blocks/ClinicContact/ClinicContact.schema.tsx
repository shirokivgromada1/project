import { Template } from "tinacms";

export const clinicContactSchema: Template = {
  name: "ClinicContact",
  label: "Clinic Contact",
  ui: {
    previewSrc: "/blocks/ClinicContact/clinic-contact-image.jpg",
    defaultItem: {
      title: "Зв’язок з нами",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "boolean",
      label: "Hidden",
      name: "isHidden",
    },
    {
      name: "schedule",
      type: "object",
      label: "Schedule",
      fields: [
        {
          label: "Schedule logo",
          name: "scheduleLogo",
          type: "image",
        },
        {
          label: "Schedule work time title",
          name: "scheduleTitle",
          type: "string",
        },
        {
          label: "Work time phones",
          name: "schedulePhones",
          type: "string",
        },
        {
          label: "Complaints and suggestions title",
          name: "schedulePropose",
          type: "string",
        },
        {
          label: "Complaints and suggestions phones",
          name: "proposePhones",
          type: "string",
        },
      ],
    },
    {
      name: "address",
      type: "object",
      label: "Address",
      fields: [
        {
          label: "Address logo",
          name: "logo",
          type: "image",
        },
        {
          label: "Address title",
          name: "title",
          type: "string",
        },
        {
          label: "Address street",
          name: "street",
          type: "string",
        },
        {
          label: "Show on map url",
          name: "url",
          type: "string",
        },
        { label: "Button text", name: "buttonText", type: "string" },
      ],
    },
    {
      name: "socials",
      type: "object",
      label: "Socials",
      fields: [
        {
          label: "Socials logo",
          name: "logo",
          type: "image",
        },
        {
          label: "Socials title",
          name: "title",
          type: "string",
        },
        {
          label: "Socials list",
          type: "object",
          name: "socialList",
          list: true,
          fields: [
            {
              label: "Social icon",
              type: "image",
              name: "icon",
            },
            {
              label: "Social name",
              type: "string",
              name: "name",
            },
          ],
        },
      ],
    },
  ],
};
