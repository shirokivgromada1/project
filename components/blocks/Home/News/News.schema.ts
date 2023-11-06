import { Template } from "tinacms";

export const newsComponentSchema: Template = {
  name: "news",
  label: "News Swiper",
  ui: {
    previewSrc: "/blocks/Home/News/newsSwiper.png",
  },
  fields: [
    {
      label: "Minor block",
      type: "boolean",
      name: "notMain",
    },
    {
      type: "object",
      label: "Headline",
      name: "headline",
      fields: [
        {
          type: "string",
          label: "Text",
          name: "text",
        },

        {
          type: "string",
          label: "Position Text",
          name: "positionHeadline",
          options: [
            {
              value: "left",
              label: "Left",
            },
            {
              value: "right",
              label: "Right",
            },
            {
              value: "center",
              label: "Center",
            },
          ],
        },
      ],
    },
    {
      type: "string",
      label: "Text position",
      name: "positionText",
      options: [
        {
          value: "left",
          label: "Left",
        },
        {
          value: "right",
          label: "Right",
        },
        {
          value: "center",
          label: "Center",
        },
      ],
    },
  ],
};
