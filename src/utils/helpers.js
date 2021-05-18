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
  /* if (!options.providers) return [PROVIDERS.default.prefix]; */
  return [PROVIDERS.default.prefix, ...getAcceptedProviders(options.providers)];
}

export function getAcceptedProviders(providers = []) {
  const filterOutDefault = (provider) => provider.prefix !== "all-icons";
  const mapPrefixes = (provider) => provider.prefix;
  const available = Object.values(PROVIDERS)
    .filter(filterOutDefault)
    .map(mapPrefixes);

  const filtered = [...providers].filter(function (e) {
    return this.indexOf(e) >= 0;
  }, available);

  if (!providers.length) return available;

  return filtered;
}

export function providerFromPrefix(prefix) {
  return Object.values(PROVIDERS).find(
    (provider) => provider.prefix === prefix
  );
}
