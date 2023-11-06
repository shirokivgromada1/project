import { Template } from "tinacms";

export const genderEqualityItemComponentSchema: Template = {
  name: "GenderEqualityItem",
  label: "Gender Equality Item",
  ui: {
    previewSrc: "/blocks/GenderEqualityItem/gender-equality-item.jpg",
    defaultItem: {
      title: "Загальна інформація",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      label: "Minor block",
      name: "notMain",
      type: "boolean",
    },
    {
      label: "Button 'Дивитися більше'",
      name: "watchMore",
      type: "boolean",
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
          label: "URL",
          name: "genderUrl",
          type: "string",
        },
        {
          label: "Link",
          name: "genderLink",
          type: "image",
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
