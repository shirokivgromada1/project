import { Template } from "tinacms";

export const departmentSocialProtectionSubSchema: Template = {
  name: "DepartmentSocialProtectionSub",
  label: "Department Social Protection Second Block",
  ui: {
    previewSrc:
      "/blocks/DepartmentSocialProtectionSub/department-social-protection-sub-image.jpg",
    defaultItem: {
      title:
        "Стратегії розвитку системи надання соціальних послуг Широківської територіальної громади Запорізької області до 2027 року",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "rich-text",
      label: "Description",
      name: "desc",
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
        {
          label: "Hidden",
          name: "hidden",
          type: "boolean",
        },
      ],
    },
  ],
};
