import { Template } from "tinacms";

export const councilSecretaryDescComponentSchema: Template = {
  name: "CouncilSecretaryDesc",
  label: "Council Secretary Description",
  ui: {
    previewSrc: "/blocks/CouncilSecretaryDesc/council-secretary-desc.jpg",
    defaultItem: {
      title: "Секретар ради",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "image",
      label: "Person photo",
      name: "image",
    },
    {
      type: "string",
      label: "Person fullname",
      name: "fullname",
    },
    {
      type: "object",
      label: "Employment",
      name: "employment",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "object",
          label: "Employment item",
          name: "item",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.desc };
            },
          },
          fields: [
            {
              type: "string",
              label: "Description",
              name: "desc",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Schedule",
      name: "schedule",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Time",
          name: "time",
        },
      ],
    },
    {
      type: "object",
      label: "Contacts",
      name: "contacts",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Phone 1",
          name: "phone1",
        },
        {
          type: "string",
          label: "Phone 2",
          name: "phone2",
        },
        {
          type: "string",
          label: "Place",
          name: "place",
        },
        {
          type: "string",
          label: "Email",
          name: "email",
        },
        {
          type: "string",
          label: "Facebook",
          name: "facebook",
        },
        {
          type: "string",
          label: "Instagram",
          name: "inst",
        },
        {
          type: "string",
          label: "Telegram",
          name: "telegram",
        },
      ],
    },
  ],
};
