import { FieldCollection } from "../types";

export const newsCategories: FieldCollection = {
  label: "News categories",
  name: "newsCategories",
  path: "content/newsCategories",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Category Name",
      name: "category",
      isTitle: true,
      required: true,
    },
  ],
};
