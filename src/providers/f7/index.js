import React from "react";
import decamelize from "decamelize";
import { createTags } from "../../utils/helpers";

import styles from "framework7-icons";
import * as F7 from "framework7-icons/react";

function convertFormat(name, options = {}) {
  if (options.outputFormat === "react") return name;

  const separator = "_";

  //Separate letters followed by numbers (decamelize defaults to omitting separation of letter followed by number)
  name = name.replace(/([a-z])([0-9])/i, `$1${separator}$2`);

  return decamelize(name, { separator });
}

const iconStyle = { width: "20px", height: "20px", fontSize: "20px" };

export default function (provider) {
  return (options = {}) =>
    Object.keys(F7).map((name) => {
      const icon = convertFormat(name, {});
      return {
        provider,
        name: convertFormat(name, options),
        component: () => (
          //Cannot simply generate the F7 SVG components here yet because of a bug: https://github.com/framework7io/framework7-icons/issues/34
          <i className={styles["f7-icons"]} style={iconStyle}>
            {icon}
          </i>
        ),
        tags: createTags(name, convertFormat),
      };
    });
}
