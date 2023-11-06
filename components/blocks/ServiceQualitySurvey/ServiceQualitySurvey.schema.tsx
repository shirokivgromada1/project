import { Template } from "tinacms";

export const serviceQualitySurveySchema: Template = {
  name: "ServiceQualitySurvey",
  label: "Service Quality Survey",
  ui: {
    previewSrc: "/blocks/ServiceQualitySurvey/service-quality-image.jpg",
    defaultItem: {
      body: "Опитування щодо якості послуг",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Title for mobile",
      name: "titleMob",
    },
    {
      label: "Image",
      name: "image",
      type: "image",
    },
    {
      label: "Description",
      name: "desc",
      type: "rich-text",
    },
    {
      label: "Url",
      name: "url",
      type: "string",
    },
    { label: "Button text", name: "buttonText", type: "string" },
  ],
};
