import decamelize from 'decamelize';
import { createTags } from '../utils/tags';
import * as Mdi from 'react-icons/md';
import {
  IconObjectArray,
  FormatFunction,
  ProviderConfiguration,
} from '../types';

type MdiKey = keyof typeof Mdi;

const convertFormat: FormatFunction = (name, options = {}) => {
  //FORMAT REFERENCE https://fonts.google.com/icons?selected=Material+Icons
  if (options.outputFormat === 'react') return name;

  const separator = '_';

  //Remove react icon prefixes/identifiers Md
  const reactPrefix = name.replace(/^(Md)(.*$)/, '$2');

  //Separate letters followed by numbers (decamelize defaults to omitting separation of letter followed by number)
  const separateLettersPrefix = reactPrefix.replace(
    /([a-z])([0-9])/i,
    `$1${separator}$2`
  );

  //3D is a special case which should not be decamelized as 3_d (default)
  const prefix = separateLettersPrefix.replace(/3D/, (match) =>
    match.toLowerCase()
  );

  return decamelize(prefix, separator);
};

const configuration: ProviderConfiguration = {
  title: 'Material Design',
  provider: 'mdi',
  icons: (options = {}) => {
    return Object.keys(Mdi).map((name) => {
      const Icon = Mdi[name as MdiKey];
      return {
        name: convertFormat(name, options),
        component: () => <Icon />,
        tags: createTags(name, convertFormat),
      };
    });
  },
};

export default configuration;
