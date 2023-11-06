import { Template } from "tinacms";

export const administrativeServicesLinksSchema: Template = {
  name: "AdministrativeServicesLinks",
  label: "Administrative Services Links",
  ui: {
    previewSrc:
      "/blocks/AdministrativeServicesLinks/administrative-services-links-image.jpg",
    defaultItem: {
      title: "Корисні посилання",
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
      label: "Link",
      name: "link",
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
          label: "Links List",
          name: "list",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.title };
            },
          },
          fields: [
            {
              label: "Link title",
              name: "title",
              type: "string",
            },
            {
              label: "Link",
              name: "link",
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
