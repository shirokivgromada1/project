import { Template } from "tinacms";

export const communityHeadEnterprisesComponentSchema: Template = {
  name: "CommunityHeadEnterprises",
  label: "Community Head Enterprises",
  ui: {
    previewSrc:
      "/blocks/CommunityHeadEnterprises/community-head-enterprises.jpg",
    defaultItem: {
      title: "КОМУНАЛЬНІ УСТАНОВИ/ПІДПРИЄМСТВА",
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
      label: "enterprises",
      name: "enterprises",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        {
          type: "string",
          label: "enterprises name",
          name: "name",
        },
        {
          type: "string",
          label: "Enterprises own page",
          name: "link",
        },
        {
          type: "boolean",
          label: "Hidden",
          name: "isHidden",
        },
      ],
    },
  ],
};
