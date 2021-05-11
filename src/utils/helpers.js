import { PROVIDERS } from "../config";

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
