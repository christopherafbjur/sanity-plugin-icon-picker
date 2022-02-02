import React from "react";
import decamelize from "decamelize";
import { createTags } from "../../utils/helpers";
import { IconContext } from "react-icons";
import * as Fa from "react-icons/fa";

function convertFormat(name, options) {
  //FORMAT REFERENCE: https://fontawesome.com/v5/cheatsheet/free/
  if (options.outputFormat === "react") return name;

  const separator = "-";
  const SPECIAL_NAMES = {
    Draft2Digital: "draft2digital",
    "500Px": "500px",
  };

  //Remove react icon prefixes/identifiers Fa/FaReg (regular)
  name = name.replace(/^(FaReg|Fa)(.*$)/, "$2");

  if (SPECIAL_NAMES[name]) return SPECIAL_NAMES[name];

  return decamelize(name, separator);
}

export default function (provider) {
  return (options = {}) => {
    const icons = Object.keys(Fa).map((name) => {
      const Icon = Fa[name];
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
