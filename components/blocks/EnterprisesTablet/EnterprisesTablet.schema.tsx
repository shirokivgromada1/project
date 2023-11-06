import { Template } from "tinacms";
export const enterprisesTabletComponentSchema: Template = {
  name: "EnterprisesTablet",
  label: "Enterprises Tablet",
  ui: {
    previewSrc: "/blocks/EnterprisesTablet/enterprises-tablet.jpg",
    defaultItem: {
      title: "КОМУНАЛЬНІ УСТАНОВИ/ПІДПРИЄМСТВА",
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
      label: "Enterprises",
      name: "enterprises",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        {
          type: "string",
          label: "Enterprise name",
          name: "name",
        },
        {
          type: "string",
          label: "Enterprise own page",
          name: "link",
        },
        {
          type: "boolean",
          label: "Hidden",
          name: "isHidden",
        },
      ],
    },
  ],
};
