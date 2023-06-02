import CONFIGURATIONS from "../configurations";
import { getSupportedProviders } from "./helpers";
import type {
  IconObjectArray,
  IconPickerOptions,
  IconObject,
  ConfigurationIconObject,
} from "../types";

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
  const supportedProviders = getSupportedProviders(options);
  let icons: IconObjectArray = [];

  const addIconProvider =
    (provider: string) =>
    (icon: ConfigurationIconObject): IconObject => {
      return {
        ...icon,
        provider,
      };
    };

  if (supportedProviders) {
    CONFIGURATIONS.filter((config) =>
      supportedProviders.includes(config.provider)
    ).forEach((config) => {
      icons = [
        ...icons,
        ...config.icons(options).map(addIconProvider(config.provider)),
      ];
    });
  }

  if (!icons.length) {
    CONFIGURATIONS.forEach((config) => {
      icons = [
        ...icons,
        ...config.icons(options).map(addIconProvider(config.provider)),
      ];
    });
  }

  if (options.configurations) {
    options.configurations.forEach((config) => {
      icons = [
        ...icons,
        ...config.icons(options).map(addIconProvider(config.provider)),
      ];
    });
  }

  return getFiltered(icons, options);
}
