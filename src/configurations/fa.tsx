import decamelize from "decamelize";
import { createTags } from "../utils/tags";
import * as Fa from "react-icons/fa";
import { FormatFunction, ProviderConfiguration } from "../types";

type FaKey = keyof typeof Fa;

const convertFormat: FormatFunction = (name, options = {}) => {
  //FORMAT REFERENCE: https://fontawesome.com/v5/cheatsheet/free/
  if (options.outputFormat === "react") return name;

  const separator = "-";
  const SPECIAL_NAMES: { [key: string]: string } = {
    Draft2Digital: "draft2digital",
    "500Px": "500px",
  };

  const prefix = name.replace(/^(FaReg|Fa)(.*$)/, "$2");

  if (SPECIAL_NAMES[prefix]) return SPECIAL_NAMES[prefix];

  return decamelize(name, separator);
};

const configuration: ProviderConfiguration = {
  title: "Font Awesome",
  provider: "fa",
  icons: (options = {}) => {
    return Object.keys(Fa).map((name) => {
      const Icon = Fa[name as FaKey];
      return {
        name: convertFormat(name, options),
        component: () => <Icon />,
        tags: createTags(name, convertFormat),
      };
    });
  },
};

export default configuration;
