import { Template } from "tinacms";

export const silradaDepartmentFunctionsComponentSchema: Template = {
  name: "SilradaDepartmentFunctions",
  label: "Silrada Functions Department",
  ui: {
    previewSrc:
      "/blocks/SilradaDepartmentFunctions/silrada-department-functions.jpg",
    defaultItem: {
      title: "Основні функції відділу:",
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
      label: "Functions",
      name: "function",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        {
          type: "string",
          label: "Function name",
          name: "name",
        },
        {
          type: "string",
          label: "Function url",
          name: "url",
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
