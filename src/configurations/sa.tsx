import * as saIcons from '@sanity/icons';
import { createTags } from '../utils/tags';
import { ICON_WIDTH, ICON_HEIGHT } from '../constants';
import { FormatFunction, ProviderConfiguration } from '../types';

const convertFormat: FormatFunction = (name, options, reactName) => {
  if (options.outputFormat === 'react') return reactName || name;
  return name;
};

const configuration: ProviderConfiguration = {
  title: 'Sanity Icons',
  provider: 'sa',
  icons: (options = {}) => {
    return Object.entries(saIcons.icons).map((icon) => {
      const name: string = icon[0];
      const reactName: string = icon[1].render.name.replace(/2$/, '');

      return {
        name: convertFormat(name, options, reactName),
        component: () =>
          icon[1].render({ width: ICON_WIDTH, height: ICON_HEIGHT }),
        tags: createTags(name, convertFormat),
      };
    });
  },
};

export default configuration;
