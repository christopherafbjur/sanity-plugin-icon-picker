import React from "react";
import { Badge } from "@sanity/ui";

import * as f7Icons from "framework7-icons/react";
import styles from "framework7-icons";
import * as faIcons from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { pascalToSnakeCase } from "./helpers";

const PREFIXES = ["font-awesome", "framework7-icons"];
const LIBRARIES = {
  "font-awesome": {
    getter: getFaIcons,
    prefix: "font-awesome",
  },
  "framework7-icons": {
    getter: getF7Icons,
    prefix: "framework7-icons",
  },
};

function getFaIcons() {
  const icons = Object.keys(faIcons)
    .map((icon) => faIcons[icon])
    .filter((icon) => typeof icon.iconName !== "undefined");

  library.add(...icons);

  return icons
    .map(({ iconName }) => ({
      from: PREFIXES[0],
      name: iconName,
    }))
    .splice(0, 10);
}
function getF7Icons() {
  const icons = Object.values(f7Icons)
    .map(({ name }) => ({
      from: PREFIXES[1],
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
      if (LIBRARIES[lib]) icons = [...icons, ...LIBRARIES[lib].getter()];
    });
  }

  if (!icons.length) {
    Object.values(LIBRARIES).forEach((lib) => {
      icons = [...icons, ...lib.getter()];
    });
  }

  return icons.splice(0, 30);
}

export const renderIcon = (icon) => {
  if (!icon) return null;

  if (icon.from === PREFIXES[1])
    return <i className={styles["f7-icons"]}>{icon.name}</i>;

  if (icon.from === PREFIXES[0])
    return <FontAwesomeIcon icon={icon.name} size="lg" />;
};
