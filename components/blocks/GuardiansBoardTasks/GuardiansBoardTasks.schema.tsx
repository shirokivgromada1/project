import { Template } from "tinacms";

export const guardiansBoardTasksComponentSchema: Template = {
  name: "GuardiansBoardTasks",
  label: "Guardians Board Tasks",
  ui: {
    previewSrc: "/blocks/GuardiansBoardTasks/guardians-board-tasks.jpg",
  },
  fields: [
    {
      type: "object",
      label: "Tasks",
      name: "tasks",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        {
          type: "string",
          label: "Task name",
          name: "name",
        },
        {
          type: "string",
          label: "Task description",
          name: "desc",
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
