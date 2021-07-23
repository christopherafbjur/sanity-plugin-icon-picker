import { PROVIDERS } from "../config";

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

//Creates tags that can be applied to icon objects for subset filtering with support for adding both react names and default names
export function createTags(name, formatFn) {
  const reactName = formatFn(name, { outputFormat: "react" });
  const defaultName = formatFn(name, {});
  return [reactName, defaultName];
}
