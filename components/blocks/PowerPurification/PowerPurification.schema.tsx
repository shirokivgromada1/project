import { Template } from "tinacms";

export const powerPurificationComponentSchema: Template = {
  name: "PowerPurification",
  label: "Power Purification",
  ui: {
    previewSrc: "/blocks/PowerPurification/power-image.jpg",
    defaultItem: {
      title: "очищення влади",
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
      label: "Power ",
      name: "power",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.person?.fullname };
        },
      },
      fields: [
        {
          label: "Person description",
          name: "person",
          type: "object",
          fields: [
            {
              label: "Fullname",
              name: "fullname",
              type: "string",
            },
            {
              label: "Position",
              name: "position",
              type: "string",
            },
          ],
        },
        {
          label: "Date",
          name: "date",
          type: "object",
          fields: [
            {
              label: "Title of declaration",
              name: "declarationTitle",
              type: "string",
            },
            {
              label: "Declaration link",
              name: "declarationLink",
              type: "image",
            },
            {
              label: "Declaration URL",
              name: "declarationUrl",
              type: "string",
            },
          ],
        },
        {
          label: "Summary",
          name: "summary",
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
