import PROVIDERS from "../providers";
import { ALL_PROVIDERS_PREFIX } from "../constants/config";
import {
  IconObjectArray,
  IconPickerOptions,
  ProviderConfiguration,
} from "../types";

export function getProviderPrefixes(options: IconPickerOptions = {}): string[] {
  return [ALL_PROVIDERS_PREFIX, ...getSupportedProviderPrefixes(options)];
}

export function getSupportedProviderPrefixes(
  options: IconPickerOptions
): string[] {
  const supportedPrefixes = PROVIDERS.map((provider) => provider.prefix);
  const customPrefixes = (options.customProviders || []).map(
    (provider) => provider.prefix
  );
  let prefixes: string[] = [];

  if (options.providers) {
    prefixes = [...options.providers].filter((p) =>
      supportedPrefixes.includes(p)
    );
  }

  if (options.customProviders) {
    prefixes = [...prefixes, ...customPrefixes];
  }

  if (!prefixes.length) return supportedPrefixes;

  return prefixes;
}

export function providerConfigurationFromPrefix(
  prefix: string,
  options: IconPickerOptions
): ProviderConfiguration {
  const providers = [...PROVIDERS, ...(options.customProviders || [])];
  return providers.find(
    (provider) => provider.prefix === prefix
  ) as ProviderConfiguration;
}

export function listToMatrix(
  list: IconObjectArray,
  elementsPerSubArray: number
): Array<IconObjectArray> {
  const matrix: Array<IconObjectArray> = [];

  for (let i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }

  return matrix;
}
