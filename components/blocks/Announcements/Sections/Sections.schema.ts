import { Template } from "tinacms";

export const announcementsSectionsComponentSchema: Template = {
  name: "announcementsSections",
  label: "Announcements Sections",
  ui: {
    previewSrc: "/blocks/Announcements/Sections/sections.png",
  },
  fields: [{ name: "title", label: "Title", type: "string" }],
};
