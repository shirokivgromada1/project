import { Template } from "tinacms";

export const departmentSocialProtectionSchema: Template = {
  name: "DepartmentSocialProtection",
  label: "Department Social Protection First Block",
  ui: {
    previewSrc:
      "/blocks/DepartmentSocialProtection/department-social-protection-image.jpg",
    defaultItem: {
      title: "Відділ соціального захисту населення",
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
      label: "Links",
      name: "links",
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
          label: "Url",
          name: "url",
          type: "string",
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
