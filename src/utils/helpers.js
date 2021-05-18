import { PROVIDERS } from "../config";
import { pascalCase, camelCase } from "change-case";

export function toPascal(str) {
  return pascalCase(str);
}

export function toCamel(str) {
  return camelCase(str, {
    transform: (input, index) => {
      if (index === 0) return input.toLowerCase();
      if (Number(input)) return input;
      return pascalCase(input);
    },
  });
}

export function pascalToSnakeCase(string) {
  return string
    .replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
      return "_" + y.toLowerCase();
    })
    .replace(/^_/, "");
}

export function pascalToKebabCase(string) {
  return string
    .replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
      return "-" + y.toLowerCase();
    })
    .replace(/^-/, "")
    .toLowerCase();
}

export function getSelectedProviders(options = {}) {
  if (!options.providers) return [PROVIDERS.default.prefix];
  return [PROVIDERS.default.prefix, ...options.providers];
}

export function providerFromPrefix(prefix) {
  return Object.values(PROVIDERS).find(
    (provider) => provider.prefix === prefix
  );
}
