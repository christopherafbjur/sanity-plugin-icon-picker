import PROVIDERS from "../../providers";

export default function ({ provider, name }) {
  const icons = PROVIDERS[provider]();
  const found = icons.find((icon) => icon.name === name);
  return found?.component();
}
