import { PROVIDERS } from "../config";
import { pascalCase, camelCase } from "change-case";

export function toCamel(str) {
  return camelCase(str, {
    transform: (input, index) => {
      if (index === 0) return input.toLowerCase();
      if (Number(input)) return input;
      return pascalCase(input);
    },
  });
}

export function getSelectedProviders(options = {}) {
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

export function listToMatrix(list, elementsPerSubArray) {
  var matrix = [],
    i,
    k;

  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }

  return matrix;
}
