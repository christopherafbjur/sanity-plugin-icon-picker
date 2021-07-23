import PROVIDERS from "../providers";
import { getAcceptedProviders } from "./helpers";

function getFiltered(icons, { filter = [] }) {
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

export function getIcons(options = {}) {
  const providers = getAcceptedProviders(options.providers);
  let icons = [];

  if (providers) {
    providers.forEach((provider) => {
      if (PROVIDERS[provider])
        icons = [...icons, ...PROVIDERS[provider](options)];
    });
  }

  if (!icons.length) {
    Object.values(PROVIDERS).forEach((providerIcons) => {
      icons = [...icons, ...providerIcons(options)];
    });
  }

  return getFiltered(icons, options);
}
