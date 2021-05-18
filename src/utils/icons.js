import React from "react";
import { PROVIDERS } from "../config";

import styles from "framework7-icons";
import * as reactIconsFa from "react-icons/fa";
import faList from "../data/fa/index";
import f7List from "../data/f7/index";
import { toPascal } from "./helpers";

console.log("RA", Object.keys(reactIconsFa).length);
console.log("FALIST", faList.length);
console.log("converted", toPascal("fa-" + faList[0]));

/* const undefinedIcons = faList.filter((name) => {
  return !reactIconsFa[toPascal("fa-" + name)];
});
console.log("THESE ARE UNDEFINED", undefinedIcons); */

const DBG_COUNT = Infinity;

const GENERATORS = {
  [PROVIDERS.fontAwesome.prefix]: () => {
    return faList
      .map((name) => {
        return {
          provider: PROVIDERS.fontAwesome.prefix,
          name: name,
          prefix: name,
          component: reactIconsFa[toPascal("fa-" + name)],
        };
      })
      .splice(0, DBG_COUNT);
  },
  [PROVIDERS.framework7.prefix]: () => {
    return f7List
      .map((name) => {
        return {
          provider: PROVIDERS.framework7.prefix,
          name: name,
          prefix: name,
          component: () => <i className={styles["f7-icons"]}>{name}</i>,
        };
      })
      .splice(0, DBG_COUNT);
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

  return icons.splice(0, DBG_COUNT * 2);
}

export const renderIcon = (icon) => {
  if (!icon) return null;

  /* if (icon.provider === PROVIDERS.framework7.prefix)
    return <i className={styles["f7-icons"]}>{icon.name}</i>; */

  return <icon.component />;
  /* if (icon.provider === PROVIDERS.fontAwesome.prefix)
    return <FontAwesomeIcon icon={icon.name} size="lg" />; */
};
