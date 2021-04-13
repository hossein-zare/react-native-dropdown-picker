# React native dropdown picker v4

A single / multiple, categorizable & searchable item picker (dropdown) component for react native which supports both Android & iOS.

## Screenshots

![Screenshot](https://raw.githubusercontent.com/hossein-zare/react-native-dropdown-picker/4.x/screenshots/1.png)
![Screenshot](https://raw.githubusercontent.com/hossein-zare/react-native-dropdown-picker/4.x/screenshots/2.png)

## Table of contents
* [Getting Started](#getting-started)
* [Installation](#installation)
* [Basic Usage](#basic-usage)
    * [Single Item](#single-item)
    * [Multiple Items](#multiple-items)
* [Available Item Properties](#available-item-properties)
* [Category Support](#category-support)
* [Searchable Items](#searchable-items)
* [Default Item](#default-item)
* [Placeholder](#placeholder)
* [Controller](#controller)
    * [Class Components](#class-components)
    * [Functional Components](#functional-components)
* [Styling The Component](#styling-the-component)
* [RTL Support](#rtl-support)
* [FAQ](#faq)
* [Props](#props)

## Dependencies

Make sure `react-native-vector-icons` is installed.  
https://github.com/oblador/react-native-vector-icons

## Changelog
- [@petkovv](https://github.com/petkovv) submitted [PR #228](https://github.com/hossein-zare/react-native-dropdown-picker/pull/228) [March 20, 2021]
- Added `noTopRadius`. [March 17, 2021]
- Added `noBottomRadius`. [March 17, 2021]
- [@antoinebrtd](https://github.com/antoinebrtd) submitted [PR #218](https://github.com/hossein-zare/react-native-dropdown-picker/pull/218) [March 09, 2021]
- [@Maclay74](https://github.com/Maclay74) submitted [PR #216](https://github.com/hossein-zare/react-native-dropdown-picker/pull/216) [Februrary 26, 2021]
- Added `childrenContainerStyle`. [Februrary 13, 2021]
- Added `textStyle` `viewStyle` & `untouchable` props to items. [Februrary 13, 2021]
- Added category support. [Februrary 13, 2021]
- Added `globalTextStyle`. [February 11, 2021]
- Added `onSearch`. [January 27, 2021]
- Added `labelProps`. [January 06, 2021]
- Some bug-fixes. [January 06, 2021]
- Added `containerProps`. [December 21, 2020]

## Getting Started

### Installation

##### via NPM

```sh
npm install react-native-dropdown-picker --save
```

##### via Yarn

```sh
yarn add react-native-dropdown-picker
```

### Basic Usage

The first step is to import the package.

```javascript
import DropDownPicker from 'react-native-dropdown-picker';
```

#### Single Item

Select a single item.

```javascript
import Icon from 'react-native-vector-icons/Feather';

this.state = {
    country: 'uk'
}

<DropDownPicker
    items={[
        {label: 'USA', value: 'usa', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true},
        {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
        {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
    ]}
    defaultValue={this.state.country}
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => this.setState({
        country: item.value
    })}
/>
```

#### Multiple Items

Select multiple items.

```javascript
import Icon from 'react-native-vector-icons/Feather';

this.state = {
    selectedCountriesValues: ['uk'],
    selectedCountries: [{label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900"/> }]
}

<DropDownPicker
    items={[
        {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
        {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
    ]}

    multiple={true}
    multipleText="%d items have been selected."
    min={0}
    max={10}

    defaultValue={this.state.countries}
    containerStyle={{height: 40}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    onChangeItem={item => this.setState({
        selectedCountriesValues: item // an array of the selected items values
    })}
    onChangeItemMultiple={item => this.setState({
        selectedCountries: item // an array of the selected items
    })}
/>
```

### Available Item Properties

Here's the type definition of an item.

```ts
type ItemType = {
    label: any; // required
    value: any; // required
    icon?: () => JSX.Element;
    hidden?: boolean;
    untouchable?: boolean;
    parent?: any;
    disabled?: boolean;
    selected?: boolean;
    viewStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
};
```

### Category Support

As of v4.x, You can simply categorize your items.

```jsx
<DropDownPicker
    items={[
        {label: 'North America', value: 'na', untouchable: true}, // North America
        {label: 'United States', value: 'us', parent: 'na'},
        {label: 'Canada', value: 'canada', parent: 'na'},
        {label: 'Mexico', value: 'mexico', parent: 'na'},

        {label: 'Europe', value: 'eu', untouchable: true}, // Europe
        {label: 'UK', value: 'uk', parent: 'eu'},
        {label: 'Germany', value: 'germany', parent: 'eu'},
        {label: 'Russia', value: 'russia', parent: 'eu'},
    ]}
    
    ...
/>
```
> The `parent` property must be equal to the `value` property of the parent item.  
> The `untouchable` property makes the item untouchable.


### Searchable Items

Search for specific items.

```javascript
searchable={true}
searchablePlaceholder="Search for an item"
searchablePlaceholderTextColor="gray"
seachableStyle={{}}
searchableError={() => <Text>Not Found</Text>}
onSearch={text => {
    // Example
    if (this._API.isFetching())
        this._API.abort();

    this._API = this.fetchFromServer(text, (items) => {
        // See controller: https://github.com/hossein-zare/react-native-dropdown-picker#controller
        this.controller.resetItems(items); // Maybe a new method will be introduced for a better UX!
    });
}}
```

### Default Item

You may want to select one of the items as default.

**Use one of the following options:**

1. Add `selected: true` to the object. **(This method is not state-friendly!)**

   ```javascript
   items={[
       {label: 'Item 1', value: 'item1'},
       {label: 'Item 2', value: 'item2', selected: true},
   ]}
   ```

2. The `defaultValue` property.
   ```javascript
   defaultValue = 'uk'; // Single
   defaultValue = ['uk']; // Multiple
   ```

### Placeholder

You may want to have a placeholder while the default value is null or an empty array.

Add the following properties to the component.

```javascript
this.state = {
    data: null, // Single
    data: [] // Multiple
}

...
defaultValue={this.state.data}
placeholder="Select an item"
...
```

### Controller

The `controller` property gives you full access to the DropDownPicker methods and properties.

##### Class Components

```javascript
constructor(props) {
    this.state = {
        value: null,
        items: []
    }

    this.controller;
}

<DropDownPicker
    items={this.state.items}
    controller={instance => this.controller = instance}
    onChangeList={(items, callback) => {
        this.setState({
            items // items: items
        }, callback);
    }}

    defaultValue={this.state.value}
    onChangeItem={item => this.setState({
        value: item.value
    })}
/>
```

##### Functional Components

```javascript
const [value, setValue] = useState(null);
const [items, setItems] = useState([ {...}, ... ]);

const controller = useRef(null);

<DropDownPicker
    items={items}
    controller={instance => controller.current = instance}
    onChangeList={(items, callback) => {
        Promise.resolve(setItems(items))
            .then(() => callback());
    }}

    defaultValue={value}
    onChangeItem={item => setValue(item.value)}
/>
```

in Class components you can call methods using `this.controller.METHOD_NAME()` and `controller.current.METHOD_NAME()` in Functional components.

1. Reset the state.

   You may want to reset the state of your picker.

   ```javascript
   this.controller.reset();
   ```

2. Reset items.

   The second argument is your default value. (Optional)

   ```javascript
   this.controller.resetItems([{}, {}, ...]);

   this.controller.resetItems([{}, {}, ...], 'uk'); // Single
   this.controller.resetItems([{}, {}, ...], ['uk', ...]); // Multiple
   ```

3. Select an item manually.

   You may want to select an item manually.

   ```javascript
   // Single
   this.controller.selectItem('uk');

   // Multiple
   this.controller.selectItem(['uk', 'france']);
   ```

4. Add items manually.

   There are two methods to help you add items manually.

   ```javascript
   this.controller.addItem({
     label: 'UK',
     value: 'uk',
     icon: () => {},
   });
   this.controller.addItems([
     {
       label: 'UK',
       value: 'uk',
       icon: () => {},
     },
   ]);
   ```

5. Remove items

   ```javascript
   this.controller.removeItem('uk', {
     changeDefaultValue: true, // Unselect if the removed item is the selected item
   });
   ```

6. Check if the dropdown is open

    ```javascript
    this.controller.isOpen(); // boolean
    ```

7. Open, close or toggle.

   ```javascript
   this.controller.open();
   this.controller.close();
   this.controller.toggle();
   ```

### Styling The Component

There are 14 props to style the component.

1. The `style` property.

   Use this to adjust the inner part of the picker.

   ```javacript
   style={{paddingVertical: 10}}
   ```

2. The `dropDownStyle` property.

   Additional styles for the dropdown box.

   ```javacript
   dropDownStyle={{backgroundColor: '#fafafa'}}
   ```

3. The `containerStyle` property.

   Use this to adjust the outer part of the picker such as `margin`, `width`, `height`, `flex`, ...

   ```javacript
   containerStyle={{width: 150, height: 70}}
   ```

4. The `itemStyle` property.

   If you want the labels on the `left` and `right` side or to centerize them:

   ```javacript
   itemStyle={{justifyContent: 'flex-start|flex-end|center'}}
   ```

5. The `labelStyle` property.

   This property gives full control over the label.

   ```javacript
   labelStyle={{
       fontSize: 14,
       textAlign: 'left',
       color: '#000'
   }}
   ```

6. The `selectedLabelStyle` property.

   Changes the style of the selected item label.

   ```javacript
   selectedLabelStyle={{
       color: '#39739d'
   }}
   ```

7. The `placeholderStyle` property.

   Style the placeholder text with this property.

   ```javacript
   placeholderStyle={{
       fontWeight: 'bold',
       textAlign: 'center'
   }}
   ```

8. The `activeItemStyle` property.

   This property allows you to style the active item.

   ```javacript
   activeItemStyle={{justifyContent: 'center'}}
   ```

9. The `activeLabelStyle` property.

   This property allows you to style the active label.

   ```javacript
   activeLabelStyle={{color: 'red'}}
   ```

10. The `arrowStyle` property.

    Adds your additional styles to the `View` element of the arrow.

    ```javacript
    arrowStyle={{marginRight: 10}}
    ```

11. The `searchableStyle` property.

    Additional styles for the `TextInput`

    ```javacript
    searchableStyle={{backgroundColor: '#dfdfdf'}}
    ```

12. The `searchablePlaceholderTextColor` property.

    Assigns a new color to the placeholder text.

    ```javacript
    searchablePlaceholderTextColor="silver"
    ```

13. The `globalTextStyle` property.

    You can style `<Text />` elements globally.

    ```javascript
    globalTextStyle={{
        fontFamily: "MyFontName",
        fontSize: 15
    }}
    ```
14. The `childrenContainerStyle` property.

    Style the children container `View` (See [Category Support](#category-support))

    ```javascript
    childrenContainerStyle={{
        paddingLeft: 30
    }}
    ```

### RTL Support

1. The selected item

   ![RTL Support](https://raw.githubusercontent.com/hossein-zare/react-native-dropdown-picker/4.x/screenshots/rtl-1.png)

   ```javascript
   style={{
       flexDirection: 'row-reverse',
   }}
   labelStyle={{
       textAlign: 'right',
   }}
   ```

2. The dropdown items

   ![RTL Support](https://raw.githubusercontent.com/hossein-zare/react-native-dropdown-picker/4.x/screenshots/rtl-2.png)

   ```javascript
   itemStyle={{
       flexDirection: 'row-reverse',
       justifyContent: 'flex-start',
   }}
   ```

### FAQ

#### How to close other pickers when opening another picker?

```javascript
this.state = {
    isVisibleA: false,
    isVisibleB: false,

    ...
}

changeVisibility(state) {
    this.setState({
        isVisibleA: false,
        isVisibleB: false,
        ...state
    });
}

// Picker A
<DropDownPicker
    isVisible={this.state.isVisibleA}
    onOpen={() => this.changeVisibility({
        isVisibleA: true
    })}
    onClose={() => this.setState({
        isVisibleA: false
    })}

    ...
/>

// Picker B
<DropDownPicker
    isVisible={this.state.isVisibleB}
    onOpen={() => this.changeVisibility({
        isVisibleB: true
    })}
    onClose={() => this.setState({
        isVisibleB: false
    })}

    ...
/>
```

#### borderRadius

Avoid using `borderRadius` and all the corners must be set separately.

```javascript
style={{
    borderTopLeftRadius: 10, borderTopRightRadius: 10,
    borderBottomLeftRadius: 10, borderBottomRightRadius: 10
}}
dropDownStyle={{
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20
}}
```

#### zIndex conflicts (Untouchable Items, Overlapping pickers)

1. Using the `containerStyle` property to style the picker results in unexpected behaviors like untouchable items.

   > The `style` and `dropDownStyle` properties must be used instead.  
   > Use the `containerStyle` prop to adjust the outer part of the picker such as `margin`, `width`, `height`, `flex`, ...

2. Nested Views

   > You have to add `zIndex` to the nested views which contain the picker.  
   > **Note!** `zIndex` locks the picker on Android, The solution is to use the `Platform.OS`

   ```javascript
   import { Platform } from 'react-native';

   <View
       style={{
           ...(Platform.OS !== 'android' && {
               zIndex: 10
           })
       }}
   >
       <DropDownPicker ... />
   </View>
   ```

   Demo: https://snack.expo.io/@hossein-zare/823437

3. DropDownPicker wrapped with `<View style={{backgroundColor: ..., border[...]: ..., elevation: ...}}>`  
   These props will make your dropdown untouchable.  
   Remove all the `backgroundColor`, `border[...]`, `elevation`, ... style properties from the parent element.  
   https://github.com/hossein-zare/react-native-dropdown-picker/issues/40#issuecomment-651744446

4. Multiple Pickers  
   The `zIndexInverse` prop must be greater than the first `zIndex` which is `5000`

   ```javascript
   <DropDownPicker zIndex={5000} zIndexInverse={6000} />
   <DropDownPicker zIndex={4000} zIndexInverse={6000} />
   <DropDownPicker zIndex={3000} zIndexInverse={6000} />
   ```

#### Dropdown Overflow

Adding borders to the component separates elements or may overflow. To solve this issue add `marginTop` to the `dropDownStyle` and specify the value which fits your UI well.

```javascript
dropDownStyle={{marginTop: 2}}
```

### Props

| Name                             | Description                                                                                                      | Type                      | Default                        | Required |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------ | -------- |
| **`items`**                      | The items for the component.                                                                                     | `array`                   |                                | **Yes**      |
| `defaultValue`                   | The value of the default item. (If `multiple={true}`, it takes an array of pre-selected values: `['uk']`)        | `any`                     |                                | **Yes**       |
| `placeholder`                    | Default text to be shown to the user when `defaultValue={null}` or `defaultValue={[]}`                           | `string`                  | 'Select an item'               | No       |
| `dropDownMaxHeight`              | Height of the dropdown box.                                                                                      | `number`                  | `150`                          | No       |
| `style`                          | Additional styles for the picker.                                                                                | `object`                  | `{}`                           | No       |
| `globalTextStyle`                          | Global text style.| `object`                  | `{}`                           | No       |
| `dropDownStyle`                  | Additional styles for the dropdown box.                                                                          | `object`                  | `{}`                           | No       |
| `containerStyle`                 | Additional styles for the container view.                                                                        | `object`                  | `{}`                           | No       |
| `itemStyle`                      | Additional styles for the items.                                                                                 | `object`                  | `{}`                           | No       |
| `labelStyle`                     | Additional styles for the labels.                                                                                | `object`                  | `{}`                           | No       |
| `selectedLabelStyle`             | Additional styles for the selected label.                                                                        | `object`                  | `{}`                           | No       |
| `placeholderStyle`               | Additional styles for the placeholder text.                                                                      | `object`                  | `{}`                           | No       |
| `activeItemStyle`                | Additional styles for the active item.                                                                           | `object`                  | `{}`                           | No       |
| `activeLabelStyle`               | Additional styles for the active label.                                                                          | `object`                  | `{}`                           | No       |
| `arrowStyle`                     | Additional styles for the arrow.                                                                                 | `object`                  | `{}`                           | No       |
| `arrowColor`                     | The color of arrow icons                                                                                         | `string`                  | `#000`                         | No       |
| `arrowSize`                      | The size of the arrow.                                                                                           | `number`                  | `15`                           | No       |
| `showArrow`                      | An option to show/hide the arrow.                                                                                | `bool`                    | `true`                         | No       |
| `customArrowUp`                  | Customize the arrow-up.                                                                                          | `func`                    | `(size, color) => ...`         | No       |
| `customArrowDown`                | Customize the arrow-down.                                                                                        | `func`                    | `(size, color) => ...`         | No       |
| `customTickIcon`                 | Customize the tick icon for multiple item picker.                                                                | `func`                    | `() => ...`                    | No       |
| `zIndex`                         | This property specifies the stack order of the component.                                                        | `number`                  | `5000`                         | No       |
| `zIndexInverse`                         | Adds a different zIndex to the dropdown box when showing it above the picker.                                                        | `number`                  | `5000`                         | No       |
| `disabled`                       | Disables the component.                                                                                          | `bool`                    | `false`                        | No       |
| `isVisible`                      | Open or close the dropdown box.                                                                                  | `bool`                    | `false`                        | No       |
| `autoScrollToDefaultValue`       | If true, automatically scroll to `defaultValue`/first `defaultValue` (multiple) during first render of dropdown  | `bool`                    | `false`                        | No       |
| `multiple`                       | If set to true selecting multiple items is possible.                                                             | `bool`                    | `false`                        | No       |
| `multipleText`                   | a Text to inform the user how many items have been selected.                                                     | `string`                  | `%d items have been selected`  | No       |
| `min`                            | Minimum number of items.                                                                                         | `number`                  | `0`                            | No       |
| `max`                            | Maximum number of items.                                                                                         | `number`                  | `10000000`                     | No       |
| `searchable`                     | Shows a `TextInput` to search for specific items.                                                                | `bool`                    | `false`                        | No       |
| `searchablePlaceholder`          | Default text to be shown to the user.                                                                            | `string`                  | `Search for an item`           | No       |
| `searchablePlaceholderTextColor` | TextInput placeholder text color.                                                                                | `string`                  | `gray`                         | No       |
| `searchableStyle`                | Additional styles for the `TextInput`                                                                            | `object`                  | `{}`                           | No       |
| `searchableError`                | Shows a jsx element when nothing found.                                                                          | `func`                    | `() => <Text>Not Found</Text>` | No       |
| `onSearch`                | Fires when you type something in the TextInput.                                                  | `func`                    | `(text) => {}` | No       |
| `selectedLabelLength`            | Specify length for the selected label.                                                                           | `number`                  | `1000`                         | No       |
| `labelLength`                    | Specify length for the labels.                                                                                   | `number`                  | `1000`                         | No       |
| `labelProps`                    | Add props to the labels.                                                                                 | `object`                  | `{}`                         | No       |
| `scrollViewProps`                | Add props to the `ScrollView`                                                                                    | `object`                  | `{}`                           | No       |
| `searchTextInputProps`                | Add props to the search `TextInput`                                                                                    | `object`                  | `{}`                           | No       |
| `offsetBottom`                    | Extra space on the bottom of the screen which is not possible to show dropdown on (bottom bar)                                                                                    | `number`                  | `0`                           | No       |
| `containerProps`                     | Add props to the container view.                                                                  | `object`                    | `{}`             | No       |
| `renderSeperator`                     | Separate items.                               | `func`                    | `undefined`             | No       |
| `controller`                     | Gives you access to the methods and properties.                                                                  | `func`                    | `(instance) => {}`             | No       |
| `onOpen`                         | Fires when you open the picker.                                                                                  | `func`                    | `() => {}`                     | No       |
| `onClose`                        | Fires when you close the picker.                                                                                 | `func`                    | `() => {}`                     | No       |
| `onChangeItem`                   | Callback which returns `item` and `index`. The `item` is the selected object or an array of the selected values. | `func`                    | `(item, index) => {}`          | No       |
| `onChangeItemMultiple`                   | Callback which returns `item`. The `item` is an array of the selected objects. Only when `multiple={true}`. | `func`                    | `(item, index) => {}`          | No       |
| `onChangeList`                   | Changes the list of items.                                                                                       |`func`                    |`(items, callback) => {}` | No                             |
| `noTopRadius`                   | Removes the top radius when the picker is open.                                                                                       | `boolean` | `true` |No                             |
| `noBottomRadius`                   | Removes the bottom radius when the picker is open.                                                                                       | `boolean` | `true` |No                             |
