import decamelize from 'decamelize';
import * as Si from 'react-icons/si';
import { createTags } from '../utils/tags';
import type { FormatFunction, ProviderConfiguration } from '../types';

type SiKey = keyof typeof Si;

const convertFormat: FormatFunction = (name, options = {}) => {
  if (options.outputFormat === 'react') return name;

  const separator = '-';

  const prefix = name.replace(/^(SiReg|Si)(.*$)/, '$2');

  return decamelize(prefix, separator);
};

const configuration: ProviderConfiguration = {
  title: 'Simple Icons',
  provider: 'si',
  icons: (options = {}) => {
    return Object.keys(Si).map((name) => {
      const Icon = Si[name as SiKey];
      return {
        name: convertFormat(name, options),
        component: () => <Icon />,
        tags: createTags(name, convertFormat),
      };
    });
  },
};

export default configuration;
