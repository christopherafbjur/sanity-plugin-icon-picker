import IconPicker from "./index";

export default {
  title: "Icon Picker",
  name: "iconPicker",
  type: "object",
  fields: [
    {
      title: "Provider",
      name: "provider",
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
