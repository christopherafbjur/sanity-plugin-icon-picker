import { defineField, definePlugin } from 'sanity';
import IconPicker from './components/IconPicker';
export * from './utils/public/utils';

export const iconPicker = definePlugin(() => {
  return {
    name: 'sanity-plugin-icon-picker',
    schema: {
      types: [
        {
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
        },
      ],
    },
  };
});
