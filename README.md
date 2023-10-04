# React Native Dropdown Picker

[![GitHub repo](https://img.shields.io/badge/GitHub_repo-grey?logo=github)](https://github.com/hossein-zare/react-native-dropdown-picker)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fhossein-zare%2Freact-native-dropdown-picker%2Fbadge%3Fref%3Ddev-5.x&style=flat)](https://actions-badge.atrox.dev/hossein-zare/react-native-dropdown-picker/goto?ref=dev-5.x)
[![react-native-dropdown-picker is released under the MIT license.](https://img.shields.io/github/license/hossein-zare/react-native-dropdown-picker)](https://github.com/hossein-zare/react-native-dropdown-picker/blob/dev-5.x/LICENSE)
[![Current npm package version.](https://img.shields.io/npm/v/react-native-dropdown-picker?color=brightgreen&label=npm%20package)](https://www.npmjs.org/package/react-native-dropdown-picker)
[![Weekly npm downloads](https://img.shields.io/npm/dw/react-native-dropdown-picker)](https://www.npmjs.org/package/react-native-dropdown-picker)
[![Documentation](https://img.shields.io/badge/Documentation-grey)](https://hossein-zare.github.io/react-native-dropdown-picker-website/docs)

---

## 📱 Screenshots

[![Screenshot showing basic dropdown](.github/assets/images/screenshots/basic.png)](https://github.com/hossein-zare/react-native-dropdown-picker/blob/dev-5.x/.github/assets/images/screenshots/basic_full.png)
[![Screenshot showing badges](.github/assets/images/screenshots/badges.png)](https://github.com/hossein-zare/react-native-dropdown-picker/blob/dev-5.x/.github/assets/images/screenshots/badges_full.png)
[![Screenshot showing dark theme and parent items](.github/assets/images/screenshots/dark_theme_parent_items.png)](https://github.com/hossein-zare/react-native-dropdown-picker/blob/dev-5.x/.github/assets/images/screenshots/dark_theme_parent_items_full.png)

The above screenshots were taken
from [this example](https://snack.expo.dev/8mHmLfcZf).

## 👋 Usage

### Basic usage

The following code shows basic usage of this library:

```javascript
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'},
        {label: 'Pear', value: 'pear'},
    ]);

    return (
        <View style={{flex: 1}}>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 15,
                }}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder={'Choose a fruit.'}
                />
            </View>

            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>Chosen fruit: {value === null ? 'none' : value}</Text>
            </View>
        </View>
    );
}
```

### Further information on usage

You can find more examples in the `examples` subdirectory. This subdirectory is
a working [Expo](https://github.com/expo/expo) project demonstrating this
library. It shows how to use this library with class components as well as with
function components, and in TypeScript as well as in JavaScript. Navigate into
the `examples` subdirectory, run `npm install`, and then run `npx expo start` to
see the examples working.

For further information on how to use this library,
read [the usage documentation](https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage).

## 📄 Further documentation

The docs can be read
at: [https://hossein-zare.github.io/react-native-dropdown-picker-website](https://hossein-zare.github.io/react-native-dropdown-picker-website)

The docs can be edited
at: [https://github.com/hossein-zare/react-native-dropdown-picker-website](https://github.com/hossein-zare/react-native-dropdown-picker-website)

## Merge and Release Process

### Branches in use

#### Development

PRs should be made against and merged into
the [`dev-5.x`](https://github.com/hossein-zare/react-native-dropdown-picker)
branch, which is set as the `default` branch on GitHub.

#### Release

Releases are currently made from
the [`5.x`](https://github.com/hossein-zare/react-native-dropdown-picker/tree/5.x)
branch.

### Release Process

To make a new release, follow these steps:

* Verify the development branch has all the changes desired in the release and
  works well
* You can test changes to this library and experiment easily
  with [patch-package](https://www.npmjs.com/package/patch-package)
* Once you have made changes, and after finalizing them, use `npm pack`
  to [test your new, changed version of this library locally and check it works correctly](https://dev.to/scooperdev/use-npm-pack-to-test-your-packages-locally-486e)
* Make and merge a final PR into the development branch that increments the
  version number in `package.json`
* Make and merge a PR from the development branch to the release branch
* Using the GitHub web UI, draft a new release using the tag name `vx.x.x`
  (replace the `x` values as appropriate). Use the release branch as the
  target, with the release name being `vx.x.x` (again, with appropriate
  numbers in place of `x`)
* Verify in the GitHub Actions panel for the repository that `npm publish`
  succeeded

[//]: # (TODO: make templates for pull requests and issues, and CONTRIBUTING.md
    include check people read docs and past issues before submitting new issues
    ensure PRs tested with npm pack: https://dev.to/scooperdev/use-npm-pack-to-test-your-packages-locally-486e
)
