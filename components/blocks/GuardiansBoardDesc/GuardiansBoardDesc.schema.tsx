import { Template } from "tinacms";

export const guardiansBoardDescComponentSchema: Template = {
  name: "GuardiansBoardDesc",
  label: "Guardians Board Desc",
  ui: {
    previewSrc: "/blocks/GuardiansBoardDesc/guardians-board-desc.jpg",
    defaultItem: {
      title: "ОПІКУНСЬКА РАДА",
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
          type: "boolean",
          label: "Hidden",
          name: "isHidden",
        },
      ],
    },
  ],
};
