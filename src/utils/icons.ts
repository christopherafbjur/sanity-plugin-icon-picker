import PROVIDERS from "../providers";
import { getSupportedProviderPrefixes } from "./helpers";
import type { IconObjectArray, IconPickerOptions, IconObject, ConfigurationIconObject } from "../types";

function getFiltered(icons: IconObjectArray, options: IconPickerOptions) {
  const filter = options.filter || [];

  if (!filter.length) return icons;

  const filtered = icons.filter(({ tags }) => {
    return filter.some((f = "") => {
      return tags.some((t) => {
        if (typeof f === "object") return f.test(t);
        return f.toLowerCase() === t.toLowerCase();
      });
    });
  });

  return filtered;
}

export function getIcons(options: IconPickerOptions = {}): IconObjectArray {
  const supportedProviderPrefixes = getSupportedProviderPrefixes(options);
  let icons: IconObjectArray = [];

  const addIconProvider = (provider: string) => (icon: ConfigurationIconObject): IconObject => {
    return {
      ...icon,
      provider
    };
  };

  if (supportedProviderPrefixes) {
    PROVIDERS.filter((provider) =>
      supportedProviderPrefixes.includes(provider.prefix)
    ).forEach((provider) => {
      icons = [
        ...icons,
        ...provider.icons(options).map(addIconProvider(provider.prefix)),
      ];
    });
  }

  if (!icons.length) {
    PROVIDERS.forEach((provider) => {
      icons = [
        ...icons,
        ...provider.icons(options).map(addIconProvider(provider.prefix)),
      ];
    });
  }

  if (options.customProviders) {
    options.customProviders.forEach((provider) => {
      icons = [
        ...icons,
        ...provider.icons(options).map(addIconProvider(provider.prefix)),
      ];
    });
  }

  return getFiltered(icons, options);
}
