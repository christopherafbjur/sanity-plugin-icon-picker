import PROVIDERS from "../providers";
import { getSupportedProviderPrefixes } from "./helpers";
import { IconObjectArray, IconPickerOptions } from "../types";

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

  if (supportedProviderPrefixes) {
    PROVIDERS.filter((provider) =>
      supportedProviderPrefixes.includes(provider.prefix)
    ).forEach((provider) => {
      icons = [...icons, ...provider.icons(options)];
    });
  }

  if (!icons.length) {
    PROVIDERS.forEach((provider) => {
      icons = [...icons, ...provider.icons(options)];
    });
  }

  if (options.customProviders) {
    options.customProviders.forEach((provider) => {
      icons = [...icons, ...provider.icons(options)];
    });
  }

  return getFiltered(icons, options);
}
