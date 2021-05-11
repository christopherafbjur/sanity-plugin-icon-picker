import IconPicker from "./picker";

export default {
  title: "Icon Picker",
  name: "iconPicker",
  type: "object",
  fields: [
    {
      title: "From",
      name: "from",
      type: "string",
    },
    {
      title: "Name",
      name: "name",
      type: "string",
    },
  ],
  inputComponent: IconPicker,
};
