import { TinaField } from "@/tina/types";

export const header: TinaField = {
  type: "object",
  label: "Header",
  name: "header",
  fields: [
    {
      label: "Icon",
      name: "icon",
      type: "image",
      ui: {
        label: "Logo",
        component: "image",
      },
    },
    {
      type: "string",
      label: "Name",
      name: "name",
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Primary", value: "primary" },
      ],
    },
    {
      type: "object",
      label: "Nav Links",
      name: "nav",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        },
        defaultItem: {
          href: "home",
          label: "Home",
        },
      },
      fields: [
        {
          type: "string",
          label: "Link",
          name: "href",
        },
        {
          type: "string",
          label: "Label",
          name: "label",
          required: true,
        },
        {
          type: "boolean",
          label: "Modal",
          name: "isModal",
        },
        {
          label: "Links",
          name: "links",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
          },
          fields: [
            {
              label: "Label",
              name: "label",
              type: "string",
            },
            { label: "Href", name: "href", type: "string" },
            {
              type: "string",
              label: "Href for tablet",
              name: "href1",
            },
          ],
        },
      ],
    },
  ],
};
