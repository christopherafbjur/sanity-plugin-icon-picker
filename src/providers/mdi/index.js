import React from "react";
import decamelize from "decamelize";
import { IconContext } from "react-icons";
import * as Mdi from "react-icons/md";

function convertFormat(name, options) {
  //FORMAT REFERENCE https://fonts.google.com/icons?selected=Material+Icons
  if (options.namingConvention === "react-icons") return name;

  const separator = "_";

  //Remove react icon prefixes/identifiers Md
  name = name.replace(/^(Md)(.*$)/, "$2");

  //Separate letters followed by numbers (decamelize defaults to omitting separation of letter followed by number)
  name = name.replace(/([a-z])([0-9])/i, `$1${separator}$2`);

  //3D is a special case which should not be decamelized as 3_d (default)
  name = name.replace(/3D/, (match) => match.toLowerCase());

  return decamelize(name, { separator });
}

export default function (provider) {
  return (options = {}) => {
    const icons = Object.keys(Mdi).map((name) => {
      const Icon = Mdi[name];
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
    return icons;
  };
}
