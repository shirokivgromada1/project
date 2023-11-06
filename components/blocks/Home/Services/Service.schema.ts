import { Template } from "tinacms";

export const servicesComponentSchema: Template = {
  name: "services",
  label: "Services",
  ui: {
    previewSrc: "/blocks/Home/Services/services.png",
    defaultItem: {
      title: "Ми надаємо такі послуги",
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
      label: "Service",
      name: "service",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.serviceTitle };
        },
      },
      fields: [
        {
          label: "Title",
          name: "serviceTitle",
          type: "string",
        },
        {
          label: "Icon",
          name: "serviceIcon",
          type: "image",
          ui: {
            validate: (value) => {
              if (value && !value.endsWith(".svg"))
                return "Inserted image must be *.svg format";
            },
          },
        },
        {
          label: "Link",
          name: "serviceLink",
          type: "string",
        },
      ],
    },
  ],
};
