import { Template } from "tinacms";

export const controllersComponentSchema: Template = {
  name: "controllers",
  label: "Controllers",
  ui: {
    previewSrc: "/blocks/News/Controllers/controllers.png",
  },
  fields: [
    {
      name: "controllers_headline",
      type: "string",
      label: "Headline",
    },
    {
      name: "hasCalendar",
      type: "boolean",
      label: "Calendar",
    },
    {
      name: "hasSearch",
      type: "boolean",
      label: "Search",
    },
    {
      name: "hasCategory",
      type: "boolean",
      label: "Category",
    },
  ],
};
