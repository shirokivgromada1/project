import { Template } from "tinacms";
import styles from "@/components/blocks/DeputyHeadTablet/DeputyHeadTablet.module.scss";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";

export const deputyHeadTabletComponentSchema: Template = {
  name: "DeputyHeadTablet",
  label: "Deputy Head Tablet",
  ui: {
    previewSrc: "/blocks/DeputyHeadTablet/deputy-head-tablet.jpg",
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
      label: "Deputy",
      name: "deputy",
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
