# sanity-plugin-icon-picker

Icon picker for Sanity which let you select icons from a set of icon providers. Currently supported providers are Font Awesome (fa), Framework7 Icons (f7), Material Design Icons (mdi), and Sanity Icons (sa).

![image](https://user-images.githubusercontent.com/13018273/118869136-4df73400-b8e5-11eb-85c4-6534994ccd95.png)

## Installation

```
sanity install icon-picker
```

## Usage

```
{
    title: "Icon",
    name: "icon",
    type: "iconPicker"
}
```

## Options

You can define which icon providers you want to use by providing their provider id in the `providers` array. If not defined, the Icon Picker defaults to display all providers and icons.

```
{
    title: "Icon",
    name: "icon",
    type: "iconPicker",
    options: {
        providers: ["f7", "fa", "mdi", "sa"]
    }
}
```

## License

MIT © Christopher Af Bjur
See LICENSE
