import { TinaField } from "@/tina/types";

export const footer: TinaField = {
  type: "object",
  label: "Footer",
  name: "footer",
  fields: [
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
      ],
    },
    {
      type: "object",
      label: "Social Links",
      name: "social",
      fields: [
        {
          type: "string",
          label: "Facebook",
          name: "facebook",
        },
        {
          type: "string",
          label: "Instagram",
          name: "instagram",
        },
        {
          type: "string",
          label: "Telegram",
          name: "telegram",
        },
      ],
    },
    {
      type: "image",
      label: "Logo",
      name: "logo",
    },
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      type: "string",
      label: "Location",
      name: "location",
    },
    {
      type: "string",
      label: "Google посилання",
      name: "googleUrl",
    },
    {
      type: "string",
      label: "Work time",
      name: "workTime",
    },
    {
      type: "string",
      label: "Phone",
      name: "phone",
    },
  ],
};
