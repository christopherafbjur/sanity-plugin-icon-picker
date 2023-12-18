import {
  castFromTyped,
  defineField,
  definePlugin,
  defineType,
} from '@sanity-typed/types';
import IconPicker from './components/IconPicker';
export * from './utils/public/utils';

const iconPickerType = defineType({
  title: 'Icon Picker',
  name: 'iconPicker',
  type: 'object',
  components: { input: IconPicker },
  fields: [
    defineField({
      title: 'Provider',
      name: 'provider',
      type: 'string',
    }),
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Inline SVG',
      name: 'svg',
      type: 'string',
    }),
  ],
});

export const iconPickerTyped = definePlugin(() => {
  return {
    name: 'sanity-plugin-icon-picker',
    schema: {
      types: [iconPickerType],
    },
  };
});

export const iconPicker = castFromTyped(iconPickerTyped);
