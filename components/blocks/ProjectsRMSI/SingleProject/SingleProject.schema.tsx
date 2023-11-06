import { Template } from "tinacms";

export const projectsRMSIComponentSchema: Template = {
  name: "RMSI",
  label: "RMSI",
  ui: {
    previewSrc: "/blocks/ProjectsRMSI/projects-rmsi.jpg",
    defaultItem: {
      title: "Проєкти PMCI",
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
      label: "Project",
      name: "project",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.projectTitle };
        },
      },
      fields: [
        {
          label: "Title",
          name: "projectTitle",
          type: "string",
        },
        {
          label: "Link",
          name: "projectLink",
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
