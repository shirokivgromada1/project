import { Template } from "tinacms";

export const communityHeadDeputiesComponentSchema: Template = {
  name: "CommunityHeadDeputies",
  label: "Community Head Deputies",
  ui: {
    previewSrc: "/blocks/CommunityHeadDeputies/community-head-deputies.jpg",
    defaultItem: {
      title: "ЗАСТУПНИКИ ГОЛОВИ",
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
      label: "Deputies",
      name: "deputies",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.fullname };
        },
      },
      fields: [
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
          type: "string",
          label: "Person position",
          name: "position",
        },
        {
          type: "string",
          label: "Person own page",
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
