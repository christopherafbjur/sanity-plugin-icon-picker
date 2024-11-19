import decamelize from 'decamelize';
import * as Lu from 'react-icons/lu';
import { createTags } from '../utils/tags';
import type { FormatFunction, ProviderConfiguration } from '../types';

type LuKey = keyof typeof Lu;

const convertFormat: FormatFunction = (name, options = {}) => {
  if (options.outputFormat === 'react') return name;

  const separator = '-';

  //Remove react icon prefixes/identifiers Lu
  const reactPrefix = name.replace(/^(Lu)(.*$)/, '$2');

  //Separate letters followed by numbers (decamelize defaults to omitting separation of letter followed by number)
  const prefix = reactPrefix.replace(/([a-z])([0-9])/i, `$1${separator}$2`);

  return decamelize(prefix, separator);
};

const configuration: ProviderConfiguration = {
  title: 'Lucide Icons',
  provider: 'lu',
  icons: (options = {}) => {
    return Object.keys(Lu).map((name) => {
      const Icon = Lu[name as LuKey];
      return {
        name: convertFormat(name, options),
        component: () => <Icon />,
        tags: createTags(name, convertFormat),
      };
    });
  },
};

export default configuration;
