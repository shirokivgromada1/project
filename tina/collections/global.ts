import { FieldCollection } from "../types";
import { footer } from "./global/footer";
import { header } from "./global/header";
import { theme } from "./global/theme";

export const global: FieldCollection = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [header, footer, theme],
};
