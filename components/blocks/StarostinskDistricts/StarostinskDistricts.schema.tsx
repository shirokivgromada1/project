import { Template } from "tinacms";

export const starostinskDistrictsComponentSchema: Template = {
  name: "StarostinskDistricts",
  label: "Starostinsk Districts",
  ui: {
    previewSrc: "/blocks/StarostinskDistricts/starostinsk-districts.jpg",
    defaultItem: {
      title: "Старостинські округи",
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
      label: "Districts",
      name: "districts",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.name };
        },
      },
      fields: [
        {
          label: "District id",
          name: "id",
          type: "number",

        },
        {
          label: "District name",
          name: "name",
          type: "string",
        },
        {
          label: "Captain name",
          name: "captain",
          type: "string",
        },
        {
          label: "Captain image",
          name: "image",
          type: "image",
        },
        {
          label: "Contacts title",
          name: "contactsTitle",
          type: "string",
        },
        {
          label: "Contacts phone",
          name: "contactsPhone",
          type: "string",
        },
        {
          label: "Contacts address",
          name: "contactsAddress",
          type: "string",
        },
        {
          label: "Schedule title",
          name: "scheduleTitle",
          type: "string",
        },
        {
          label: "Schedule date",
          name: "scheduleDate",
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
