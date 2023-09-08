# React Native Dropdown Picker

[![react-native-dropdown-picker is released under the MIT license.](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/hossein-zare/react-native-dropdown-picker/blob/dev-5.x/LICENSE)
[![Current npm package version.](https://img.shields.io/npm/v/react-native-dropdown-picker?color=brightgreen&label=npm%20package)](https://www.npmjs.org/package/react-native-dropdown-picker)

[//]: # (TODO: add badge linking to GitHub repo)

---

## Screenshots

<p float="left">
    <img src="https://user-images.githubusercontent.com/56504893/116790110-e0b36880-aac7-11eb-9ebd-196acee64f7a.png"
      width="270" alt="Screenshot showing basic dropdown" />
    <img src="https://user-images.githubusercontent.com/56504893/116789802-faec4700-aac5-11eb-837b-86f18cbfcf3d.png"
      width="270" alt="Screenshot showing badges" />
    <img src="https://user-images.githubusercontent.com/56504893/116789839-2c651280-aac6-11eb-99e0-b43b608ed8c7.png"
      width="270" alt="Screenshot showing dark theme and parent items" />
</p>

The above screenshots were taken
from [this example](https://snack.expo.dev/8mHmLfcZf).

## Usage

### Basic usage

The following code shows basic usage of the library:

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
library. It shows how to use the library with class components as well as
function components, and in TypeScript as well as in JavaScript. Navigate into
the `examples` subdirectory, run `npm install`, and then run `npx expo start` to
see the examples working.

For further information on how to use this library,
read [the relevant documentation](https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage).

## Further documentation

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
* You can test changes to the library and experiment easily
  with [patch-package](https://www.npmjs.com/package/patch-package)
* Once you have made changes, and after finalizing them, use `npm pack`
  to [test your new, changed version of the library locally and check it works correctly](https://dev.to/scooperdev/use-npm-pack-to-test-your-packages-locally-486e)
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
