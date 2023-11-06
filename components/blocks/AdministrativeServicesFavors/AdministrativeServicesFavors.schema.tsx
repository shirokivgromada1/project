import { Template } from "tinacms";

export const administrativeServicesFavorsSchema: Template = {
  name: "AdministrativeServicesFavors",
  label: "Administrative Services Favors",
  ui: {
    previewSrc:
      "/blocks/AdministrativeServicesFavors/administrative-services-favors-image.jpg",
    defaultItem: {
      title: "Послуги",
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
      label: "Favor",
      name: "favor",
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
          label: "Favor List",
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
              label: "Favor title",
              name: "title",
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
