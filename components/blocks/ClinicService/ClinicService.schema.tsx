import { Template } from "tinacms";

export const clinicServiceSchema: Template = {
  name: "ClinicService",
  label: "Clinic Service",
  ui: {
    previewSrc: "/blocks/ClinicService/clinic-service-image.jpg",
    defaultItem: {
      title: "Які медичні послуги ми пропонуємо?",
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
      label: "Services list",
      name: "servicess",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
        },
      },
      fields: [
        { name: "title", label: "Service name", type: "string" },
        { name: "icon", type: "image", label: "Service icon" },
        { name: "image", type: "image", label: "Service image" },
        { name: "isServiceHidden", label: "Hidden", type: "boolean" },
        {
          name: "description",
          label: "Service description",
          type: "object",
          fields: [
            { name: "descTitle", label: "Title", type: "string" },
            { name: "descSubtext", label: "Subtext", type: "string" },
            { name: "descPhone", label: "Phone for subtext", type: "string" },
            {
              name: "functions",
              label: "List of items",
              type: "object",
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.name };
                },
              },
              fields: [{ name: "name", type: "string", label: "Name" }],
            },
          ],
        },
      ],
    },
  ],
};
