import React from "react";
import decamelize from "decamelize";
import { createTags } from "../../utils/helpers";
import { IconContext } from "react-icons";
import * as Fi from "react-icons/fi";

function convertFormat(name, options) {
  //FORMAT REFERENCE https://github.com/tailwindlabs/heroicons
  if (options.outputFormat === "react") return name;

  const separator = "-";

  //Remove react icon prefixes/identifiers Fi
  name = name.replace(/^(Fi)(.*$)/, "$2");

  //Separate letters followed by numbers (decamelize defaults to omitting separation of letter followed by number)
  name = name.replace(/([a-z])([0-9])/i, `$1${separator}$2`);

  return decamelize(name, separator);
}

export default function (provider) {
  return (options = {}) => {
    const icons = Object.keys(Fi).map((name) => {
      const Icon = Fi[name];
      return {
        provider,
        name: convertFormat(name, options),
        component: () => (
          <IconContext.Provider value={{ size: "20px" }}>
            <Icon />
          </IconContext.Provider>
        ),
        tags: createTags(name, convertFormat),
      };
    });
    return icons;
  };
}
