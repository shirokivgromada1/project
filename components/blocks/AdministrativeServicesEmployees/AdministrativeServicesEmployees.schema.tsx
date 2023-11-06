import { Template } from "tinacms";

export const administrativeServicesEmployeesSchema: Template = {
  name: "AdministrativeServicesEmployees",
  label: "Administrative Services Employees",
  ui: {
    previewSrc:
      "/blocks/AdministrativeServicesEmployees/administrative-services-employees-image.jpg",
    defaultItem: {
      title: "Центр надання адміністративних послуг",
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
      label: "Employee",
      name: "employee",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.fullname };
        },
      },
      fields: [
        {
          label: "Fullname",
          name: "fullname",
          type: "string",
        },
        {
          label: "District",
          name: "district",
          type: "string",
        },
        { label: "Photo", name: "photo", type: "image" },

        {
          label: "Phone number",
          name: "phone",
          type: "string",
        },
        {
          label: "Address",
          name: "address",
          type: "string",
        },
        {
          label: "Email",
          name: "email",
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
