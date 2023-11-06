import { Template } from "tinacms";

export const communityHeadCardsComponentSchema: Template = {
  name: "CommunityHeadCards",
  label: "Community Head Cards",
  ui: {
    previewSrc: "/blocks/CommunityHeadCards/community-head-cards.jpg",
  },
  fields: [
    {
      type: "object",
      label: "Cards",
      name: "cards",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        {
          type: "string",
          label: "Card name",
          name: "name",
        },
        {
          type: "string",
          label: "Card page link",
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
