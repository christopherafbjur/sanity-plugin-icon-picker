# sanity-plugin-icon-picker

Icon picker for Sanity which let you select icons from a set of icon providers.

![image](https://user-images.githubusercontent.com/45116528/119020168-2642b300-b95b-11eb-8685-c5720afee57f.png)

## Installation

```
sanity install icon-picker
```

## Usage

```js
{
    title: "Icon",
    name: "icon",
    type: "iconPicker"
}
```

## Options

### Providers

You can define which icon providers you want to use by providing their provider id in the `providers` array. If not defined, the Icon Picker defaults to display all providers and icons.

```js
{
    title: "Icon",
    name: "icon",
    type: "iconPicker",
    options: {
        providers: ["f7", "fa", "mdi", "sa", "hi", "fi"]
    }
}
```

### Output Format

You can format the output data in accordance with your front-end project. If you're using [React Icons](https://github.com/react-icons/react-icons) you can set the `outputFormat` to `react-icons`. If you ommit this option, the output format will be in accordance with every single provider's icon naming convention.

```js
{
    title: "Icon",
    name: "icon",
    type: "iconPicker",
    options: {
        outputFormat: 'react-icons',
    }
}
```

## Supported Icon Providers

| Provider                | Prefix | Homepage                                       |
| :---------------------- | :----- | :--------------------------------------------- |
| `Framework7`            | `f7`   | https://framework7.io/icons/                   |
| `Font Awesome`          | `fa`   | https://fontawesome.com/                       |
| `Material Design Icons` | `mdi`  | http://google.github.io/material-design-icons/ |
| `Sanity Icons`          | `sa`   | https://www.sanity.io/                         |
| `Hero Icons`            | `hi`   | https://github.com/tailwindlabs/heroicons      |
| `Feather Icons`         | `fi`   | https://feathericons.com/                      |

## Helper functions

In order to render the icon component as preview media, we can import a helper method.

```js
import preview from "part:sanity-plugin-icon-picker/preview";
```

We can then render the icon by passing the selected name and provider to this method which will return an icon component.

```js
{
...
    preview: {
        select: {
          provider: "icon.provider",
          name: "icon.name",
        },
        prepare(icon) {
          return {
            title: icon.provider,
            subtitle: icon.name,
            media: preview(icon),
          };
        },
      }
}
```

## License

MIT © Christopher Af Bjur
See LICENSE
