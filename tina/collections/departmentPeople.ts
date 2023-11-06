import { FieldCollection } from "../types";
import { sectionsTemplate } from "./util/sectionsTemplate";
import slugify from "slugify";

export const departmentPeople: FieldCollection = {
  label: "Люди громади",
  name: "departmentPeople",
  path: "content/departmentPeople",
  ui: {
    router: ({ document }) => {
      return `/silrada/${document._sys.filename}`;
    },
    filename: {
      slugify: (values) => {
        let str = "";
        if (values?.role && values?.fullName) {
          const firstName = slugify(values?.fullName.split(" ")[0][0], {
            locale: "uk",
          }).toLocaleLowerCase();
          const lastName = slugify(values?.fullName.split(" ")[1][0], {
            locale: "uk",
          }).toLocaleLowerCase();
          const patronymic = slugify(values?.fullName.split(" ")[2][0], {
            locale: "uk",
          }).toLocaleLowerCase();
          str += `${
            values.role.split("/").splice(-1)[0].split(".")[0]
          }-${firstName}${lastName}${patronymic}`;
        }
        return str || "no-topic";
      },
    },
  },
  fields: [
    {
      type: "string",
      label: "Full Name",
      name: "fullName",
      isTitle: true,
      required: true,
    },
    {
      type: "image",
      label: "Фото",
      name: "photo",
    },
    {
      type: "rich-text",
      label: "Опис",
      name: "description",
    },
    {
      type: "string",
      label: "Графік роботи",
      name: "workTime",
    },
    {
      type: "string",
      label: "Адрес",
      name: "address",
    },
    {
      type: "string",
      label: "E-mail",
      name: "mail",
    },
    {
      type: "object",
      label: "Контакти",
      name: "contacts",
      list: true,
      fields: [
        {
          type: "string",
          name: "phone",
          label: "Номер телефону",
        },
      ],
    },
    {
      label: "Роль",
      name: "role",
      type: "reference",
      collections: ["roles"],
    },
    {
      label: "Функції",
      name: "functions",
      type: "object",
      list: true,
      fields: [
        {
          type: "string",
          name: "function",
          label: "Функція",
        },
      ],
    },
    {
      label: "Результат",
      name: "results",
      type: "object",
      list: true,
      fields: [
        {
          type: "image",
          name: "image",
          label: "Картинка",
        },
        {
          type: "string",
          name: "title",
          label: "Опис",
        },
      ],
    },
    {
      label: "Соціальні мережі",
      name: "socials",
      type: "object",
      fields: [
        {
          label: "Facebook",
          name: "facebookUrl",
          type: "string",
        },
        {
          label: "Instagram",
          name: "instagramUrl",
          type: "string",
        },
        {
          label: "Telegram",
          name: "telegramUrl",
          type: "string",
        },
      ],
    },
    sectionsTemplate,
  ],
};
