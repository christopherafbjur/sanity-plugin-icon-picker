import React from "react";
import { PROVIDERS } from "../config";

//Framework7
import styles from "framework7-icons";
import f7List from "../data/f7/index";

//Material Design
import * as mdIcons from "@mdi/js";
import MaterialDesignIcon from "@mdi/react";
import mdList from "../data/md/index";

//Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as faIcons from "@fortawesome/free-solid-svg-icons";
import faList from "../data/fa/index";

import { toCamel, getAcceptedProviders } from "./helpers";

const DBG_COUNT = Infinity;

const GLOBAL_ICON_STYLE = { width: "20px", height: "20px", fontSize: "20px" };

const GENERATORS = {
  [PROVIDERS.fontAwesome.prefix]: () => {
    const myList = faList.map((item) => faIcons[toCamel("fa-" + item)]);
    library.add(...myList);

    return faList
      .map((name) => {
        return {
          provider: PROVIDERS.fontAwesome.prefix,
          name: name,
          component: () => (
            <FontAwesomeIcon
              style={GLOBAL_ICON_STYLE}
              icon={name}
            ></FontAwesomeIcon>
          ),
        };
      })
      .splice(0, DBG_COUNT);
  },
  [PROVIDERS.materialDesign.prefix]: () => {
    return mdList
      .map((name) => {
        const path = mdIcons[toCamel(name)];

        return {
          provider: PROVIDERS.materialDesign.prefix,
          name: name,
          component: () => (
            <MaterialDesignIcon style={GLOBAL_ICON_STYLE} path={path} />
          ),
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
          component: () => (
            <i className={styles["f7-icons"]} style={GLOBAL_ICON_STYLE}>
              {name}
            </i>
          ),
        };
      })
      .splice(0, DBG_COUNT);
  },
};

export function getIcons(options = {}) {
  const providers = getAcceptedProviders(options.providers);
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
