import decamelize from "decamelize";
import React from "react";
import { IconContext } from "react-icons";
import * as Si from "react-icons/si";
import { createTags } from "../../utils/helpers";

function convertFormat(name, options) {
  if (options.outputFormat === "react") return name;

  const separator = "-";

  name = name.replace(/^(SiReg|Si)(.*$)/, "$2");

  return decamelize(name, separator);
}

export default function (provider) {
  return (options = {}) => {
    const icons = Object.keys(Si).map((name) => {
      const Icon = Si[name];
      return {
        provider,
        name: convertFormat(name, options),
        component: () => <Icon />,
        tags: createTags(name, convertFormat),
      };
    });
    return icons;
  };
}
