import { Template } from "tinacms";

export const educationInstitutionsComponentSchema: Template = {
  name: "EducationInstitutions",
  label: "Education Institutions",
  ui: {
    previewSrc: "/blocks/EducationInstitutions/education-institutions.jpg",
    defaultItem: {
      title: "ЗАКЛАДИ ОСВІТИ",
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
      label: "Institution",
      name: "institution",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.title.name };
        },
      },
      fields: [
        {
          label: "Title",
          name: "title",
          type: "object",
          fields: [
            {
              label: "Name",
              name: "name",
              type: "string",
            },
            {
              label: "Director",
              name: "director",
              type: "string",
            },
          ],
        },
        {
          label: "Contacts",
          name: "institutionContacts",
          type: "object",
          fields: [
            {
              label: "Email",
              name: "email",
              type: "string",
            },
            {
              label: "Phone",
              name: "phone",
              type: "string",
            },
          ],
        },
        {
          label: "Address",
          name: "institutionAddress",
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
