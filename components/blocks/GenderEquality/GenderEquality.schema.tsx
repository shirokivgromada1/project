import { Template } from "tinacms";

export const genderEqualityComponentSchema: Template = {
  name: "GenderEquality",
  label: "Gender Equality",
  ui: {
    previewSrc: "/blocks/GenderEquality/gender-equality.jpg",
    defaultItem: {
      title: "Гендерна рівність",
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
      label: "Gender",
      name: "gender",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.genderTitle };
        },
      },
      fields: [
        {
          label: "Title",
          name: "genderTitle",
          type: "string",
        },
        {
          label: "Link",
          name: "genderLink",
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
