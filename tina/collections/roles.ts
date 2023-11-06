import CryptoJS from "crypto-js";
import { FieldCollection } from "../types";
import slugify from "slugify";

export const roles: FieldCollection = {
  label: "Ролі",
  name: "roles",
  path: "content/roles",
  ui: {
    filename: {
      slugify: (values: any) => {
        if (values?.role) {
          return slugify(values.role, { locale: "uk" }).toLocaleLowerCase();
        }
        return `no-topic`;
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "role",
      label: "Роль",
      isTitle: true,
      required: true,
    },
  ],
};
