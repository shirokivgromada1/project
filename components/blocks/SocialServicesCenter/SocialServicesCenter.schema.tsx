import { Template } from "tinacms";

export const socialServicesCenterSchema: Template = {
  name: "SocialServicesCenter",
  label: "Social Services Center",
  ui: {
    previewSrc: "/blocks/SocialServicesCenter/social-services-center-image.jpg",
    defaultItem: {
      title: "КУ “Центр соціальних послуг Широківської громади”",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      label: "Subtitle",
      name: "subtitle",
      type: "string",
    },
    {
      type: "object",
      label: "Service",
      name: "service",
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
          label: "Description",
          name: "desc",
          type: "string",
        },
        {
          label: "List of service functions",
          name: "functions",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.singleFunction };
            },
          },
          fields: [
            {
              name: "singleFunction",
              type: "string",
              label: "Function name",
            },
            {
              label: "Hidden",
              name: "hidden",
              type: "boolean",
            },
          ],
        },
        {
          label: "Contacts",
          name: "contacts",
          type: "string",
        },
        {
          label: "Hidden",
          name: "hidden",
          type: "boolean",
        },
      ],
    },
    { type: "string", name: "taxiTitle", label: "Taxi title" },
    { type: "string", name: "taxiSubtitle", label: "Taxi subtitle" },
  ],
};
