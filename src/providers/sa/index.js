import * as saIcons from "@sanity/icons";

function convertFormat(icon, options) {
  if (options.outputFormat === "react")
    return icon[1].render.name.replace(/2$/, "");
  return icon[0];
}

export default function (provider) {
  return (options = {}) =>
    Object.entries(saIcons.icons).map((icon) => {
      return {
        provider,
        name: convertFormat(icon, options),
        component: () => icon[1].render({ width: "1.5em" }),
      };
    });
}
