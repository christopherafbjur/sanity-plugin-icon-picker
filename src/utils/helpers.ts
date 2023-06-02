import CONFIGURATIONS from "../configurations";
import {
  IconObjectArray,
  IconPickerOptions,
  ProviderConfiguration,
} from "../types";

export function getProviders(options: IconPickerOptions = {}): string[] {
  return [...getSupportedProviders(options)];
}

export function getSupportedProviders(options: IconPickerOptions): string[] {
  const supportedProviders = CONFIGURATIONS.map((config) => config.provider);
  const customProviders = (options.configurations || []).map(
    (config) => config.provider
  );
  let providers: string[] = [];

  if (options.providers) {
    providers = [...options.providers].filter((p) =>
    supportedProviders.includes(p)
    );
  }

  if (options.configurations) {
    providers = [...providers, ...customProviders];
  }


  if (!providers.length) return supportedProviders;

  return providers;
}

export function configurationFromProvider(
  provider: string,
  options: IconPickerOptions
): ProviderConfiguration {
  const configurations = [...CONFIGURATIONS, ...(options.configurations || [])];
  return configurations.find(
    (config) => config.provider === provider
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
