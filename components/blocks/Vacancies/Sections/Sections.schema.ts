import { Template } from "tinacms";

export const vacanciesSectionsComponentSchema: Template = {
  name: "vacanciesSections",
  label: "Vacancies Sections",
  ui: {
    previewSrc: "/blocks/Vacancies/Sections/vacancies.png",
  },
  fields: [{ name: "title", label: "Title", type: "string" }],
};
