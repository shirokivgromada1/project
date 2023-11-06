import { TinaField } from "@/tina/types";

export const theme: TinaField = {
  type: "object",
  label: "Theme",
  name: "theme",
  // @ts-ignore
  fields: [
    // {
    //   type: "string",
    //   label: "Primary Color",
    //   name: "color",
    //   ui: {
    //     component: ColorPickerInput,
    //   },
    // },
    {
      type: "string",
      name: "font",
      label: "Font Family",
      options: [
        {
          label: "System Sans",
          value: "sans",
        },
        {
          label: "Nunito",
          value: "nunito",
        },
        {
          label: "Lato",
          value: "lato",
        },
      ],
    },
    {
      type: "string",
      name: "darkMode",
      label: "Dark Mode",
      options: [
        {
          label: "System",
          value: "system",
        },
        {
          label: "Light",
          value: "light",
        },
        {
          label: "Dark",
          value: "dark",
        },
      ],
    },
  ],
};
