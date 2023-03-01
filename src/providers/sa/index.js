import * as saIcons from "@sanity/icons";
import { createTags } from "../../utils/helpers";
import { ICON_WIDTH, ICON_HEIGHT } from "../../constants";

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
        component: () =>
          icon[1].render({ width: ICON_WIDTH, height: ICON_HEIGHT }),
        tags: createTags(icon, convertFormat),
      };
    });
}
