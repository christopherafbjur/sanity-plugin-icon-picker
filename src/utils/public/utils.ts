import CONFIGURATIONS from '../../configurations';
import { getIcons } from '../icons';
import type { IconObject, IconPickerOptions } from '../../types';
import type { ReactElement } from 'react';

type Preview = Pick<IconObject, 'provider' | 'name'> & {
  options?: IconPickerOptions;
};
// eslint-disable-next-line react/display-name
export const preview = ({
  provider,
  name,
  options = {},
}: Preview): ReactElement | null => {
  const customConfigurations = options.configurations || [];

  if (!provider) return null;

  const icons = [...CONFIGURATIONS, ...customConfigurations]
    .find((config) => config.provider === provider)
    ?.icons();
  const found = icons?.find((icon) => icon.tags.some((tag) => tag === name));
  return found?.component() || null;
};

export const migrateIconName = (
  name: string,
  provider: string,
  format?: 'react'
): string => {
  const found = getIcons({ outputFormat: format }).find(
    (icon) => icon.provider === provider && icon.tags.includes(name)
  );

  if (!name) {
    throw new Error(`Must specify a name! Got ${name}`);
  }
  if (!found) {
    throw new Error(
      `Icon with name ${name} for provider ${provider} not found!`
    );
  }
  const [reactName, defaultName] = found.tags;
  return format === 'react' ? reactName : defaultName;
};
