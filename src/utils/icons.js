import PROVIDERS from "../providers";
import { getAcceptedProviders } from "./helpers";

export function getIcons(options = {}) {
  const providers = getAcceptedProviders(options.providers);
  let icons = [];

  if (providers) {
    providers.forEach((provider) => {
      if (PROVIDERS[provider]) icons = [...icons, ...PROVIDERS[provider]()];
    });
  }

  if (!icons.length) {
    Object.values(PROVIDERS).forEach((providerIcons) => {
      icons = [...icons, ...providerIcons()];
    });
  }

  return icons;
}
