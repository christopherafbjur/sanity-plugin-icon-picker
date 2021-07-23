import PROVIDERS from "../../providers";

export default function ({ provider, name }) {
  if (!provider) return null;

  const icons = PROVIDERS[provider]();
  const found = icons.find((icon) => icon.tags.some((tag) => tag === name));
  return found?.component();
}
