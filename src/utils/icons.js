import React from "react";
import { Badge } from "@sanity/ui";

import * as f7Icons from "framework7-icons/react";
import styles from "framework7-icons";
import * as faIcons from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { pascalToSnakeCase } from "./helpers";

const LIBRARIES = {
  "font-awesome": getFaIcons,
  "f7-icons": getF7Icons,
};

function getFaIcons() {
  const icons = Object.keys(faIcons)
    .map((icon) => faIcons[icon])
    .filter((icon) => typeof icon.iconName !== "undefined");

  library.add(...icons);

  return icons
    .map(({ iconName, icon }) => ({
      from: "fa",
      name: iconName,
    }))
    .splice(0, 10);
}
function getF7Icons() {
  const icons = Object.values(f7Icons)
    .map(({ name }) => ({
      from: "f7",
      name: pascalToSnakeCase(name),
    }))
    .splice(0, 10);
  return icons;
}

export function getIcons(options = {}) {
  const libs = options.libs;
  let icons = [];

  if (libs) {
    libs.forEach((lib) => {
      if (LIBRARIES[lib]) icons = [...icons, ...LIBRARIES[lib]()];
    });
  }

  if (!icons.length) {
    Object.values(LIBRARIES).forEach((getLib) => {
      icons = [...icons, ...getLib()];
    });
  }

  return icons.splice(0, 30);
}

export const renderIcon = (icon) => {
  if (!icon) return null;

  if (icon.from === "f7")
    return (
      <span>
        <i className={styles["f7-icons"]}>{icon.name}</i>
        <Badge tone="primary">F7</Badge>
      </span>
    );

  if (icon.from === "fa")
    return (
      <span>
        <FontAwesomeIcon icon={icon.name} />
        <Badge tone="primary">FA</Badge>
      </span>
    );
};
