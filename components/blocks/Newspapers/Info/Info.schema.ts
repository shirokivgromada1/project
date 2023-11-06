import { Template } from "tinacms";

export const newspapersInfoComponentSchema: Template = {
  name: "newspapersInfo",
  label: "Newspapers Info",
  ui: {
    previewSrc: "/blocks/Newspapers/Info/info.png",
  },
  fields: [
    { name: "titleInfo", label: "Title", type: "string" },
    { name: "descriptionInfo", label: "Description", type: "rich-text" },
    {
      name: "contactsInfo",
      label: "Contacts",
      type: "object",
      list: true,
      fields: [
        {
          name: "contact",
          label: "Contact",
          type: "string",
        },
      ],
    },
    {
      name: "servicesCost",
      label: "Services Cost",
      type: "object",
      list: true,
      fields: [
        {
          name: "name",
          label: "Name",
          type: "string",
        },
        {
          name: "cost",
          label: "Cost",
          type: "number",
        },
      ],
    },
  ],
};
