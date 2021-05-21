import * as saIcons from "@sanity/icons";

export default function (provider) {
  return () =>
    Object.entries(saIcons.icons).map((icon) => {
      return {
        provider,
        name: icon[0],
        component: () => icon[1].render({ width: "1.5em" }),
      };
    });
}
