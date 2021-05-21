import PROVIDERS from "../../providers";

export default function ({ provider, name }) {
  if (!provider) return null;

  const icons = PROVIDERS[provider]();
  const found = icons.find((icon) => icon.name === name);
  return found?.component();
}
