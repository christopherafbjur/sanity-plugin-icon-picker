import React from "react";
import { PROVIDERS } from "../config";

import * as f7Icons from "framework7-icons/react";
import styles from "framework7-icons";
import * as faIcons from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { pascalToSnakeCase } from "./helpers";

const GENERATORS = {
  [PROVIDERS.fontAwesome.prefix]: () => {
    const icons = Object.keys(faIcons)
      .map((icon) => faIcons[icon])
      .filter((icon) => typeof icon.iconName !== "undefined");

    library.add(...icons);

    return icons
      .map(({ iconName }) => ({
        provider: PROVIDERS.fontAwesome.prefix,
        name: iconName,
      }))
      .splice(0, 10);
  },
  [PROVIDERS.framework7.prefix]: () => {
    const icons = Object.values(f7Icons).map(({ name }) => ({
      provider: PROVIDERS.framework7.prefix,
      name: pascalToSnakeCase(name),
    }));
    return icons.splice(0, 10);
  },
};

export function getIcons(options = {}) {
  const providers = options.providers;
  let icons = [];

  if (providers) {
    providers.forEach((provider) => {
      if (GENERATORS[provider]) icons = [...icons, ...GENERATORS[provider]()];
    });
  }

  if (!icons.length) {
    Object.values(GENERATORS).forEach((providerIcons) => {
      icons = [...icons, ...providerIcons()];
    });
  }

  return icons.splice(0, 30);
}

export const renderIcon = (icon) => {
  if (!icon) return null;

  if (icon.provider === PROVIDERS.framework7.prefix)
    return <i className={styles["f7-icons"]}>{icon.name}</i>;

  if (icon.provider === PROVIDERS.fontAwesome.prefix)
    return <FontAwesomeIcon icon={icon.name} size="lg" />;
};
