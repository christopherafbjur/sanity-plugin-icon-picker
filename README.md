# sanity-plugin-icon-picker

Icon picker for Sanity which let you select icons from a set of icon providers. Currently supported providers are Font Awesome (fa), Framework7 Icons (f7), Material Design Icons (mdi), and Sanity Icons (sa).

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

You can define which icon providers you want to use by providing their provider id in the `providers` array. If not defined, the Icon Picker defaults to display all providers and icons.

```js
{
    title: "Icon",
    name: "icon",
    type: "iconPicker",
    options: {
        providers: ["f7", "fa", "mdi", "sa"]
    }
}
```

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
