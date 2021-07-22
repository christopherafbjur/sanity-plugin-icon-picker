import React from "react";
import { IconContext } from "react-icons";
import * as Fa from "react-icons/fa";
import { decamelizeString } from "../../utils/helpers";

function convertFormat(name, options) {
  if (options.useReactIconsFormat) return name;

  //Remove react icon prefixes/identifiers Fa/FaReg (regular)
  name = name.replace(/^(FaReg|Fa)(.*$)/, "$2");

  return decamelizeString(name, "-");
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
      };
    });
    console.log(icons);
    return icons;
  };
}
