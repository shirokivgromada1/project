import { Template } from "tinacms";

export const monitoringEnsuringAccessSchema: Template = {
  name: "MonitoringEnsuringAccess",
  label: "Monitoring Ensuring Access ",
  ui: {
    previewSrc: "/blocks/MonitoringEnsuringAccess/monitoring-image.jpg",
    defaultItem: {
      body: "Опитування щодо якості послуг",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      label: "Description",
      name: "desc",
      type: "rich-text",
    },
    {
      type: "object",
      label: "Links",
      name: "links",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.title };
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
          label: "Hidden",
          name: "hidden",
          type: "boolean",
        },
      ],
    },
  ],
};
