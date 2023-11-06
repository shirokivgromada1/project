import { Template } from "tinacms";
export const departmentsTabletComponentSchema: Template = {
  name: "DepartmentsTablet",
  label: "Departments Tablet",
  ui: {
    previewSrc: "/blocks/DepartmentsTablet/departments-tablet.jpg",
    defaultItem: {
      title: "ВІДДІЛИ СІЛЬСЬКОЇ РАДИ",
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
      label: "Departments",
      name: "departments",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        {
          type: "image",
          label: "Department icon",
          name: "image",
        },
        {
          type: "string",
          label: "Department name",
          name: "name",
        },
        {
          type: "string",
          label: "Department own page",
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
