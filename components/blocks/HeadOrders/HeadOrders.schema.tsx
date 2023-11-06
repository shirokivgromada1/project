import { Template } from "tinacms";

export const headOrdersSchema: Template = {
  name: "HeadOrders",
  label: "Head Orders",
  ui: {
    previewSrc: "/blocks/HeadOrders/head-orders.jpg",
    defaultItem: {
      title: "Розпорядження голови",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      label: "Subtitle",
      name: "subtitle",
      type: "string",
    },
    {
      label: "Minor block",
      name: "notMain",
      type: "boolean",
    },
    {
      type: "object",
      label: "Order",
      name: "order",
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
