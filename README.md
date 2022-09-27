# React Native Dropdown Picker 5.x

<p float="left">
    <img src="https://user-images.githubusercontent.com/56504893/116790110-e0b36880-aac7-11eb-9ebd-196acee64f7a.png" width="270" alt="Screenshot">
    <img src="https://user-images.githubusercontent.com/56504893/116789802-faec4700-aac5-11eb-837b-86f18cbfcf3d.png" width="270" alt="Screenshot">
    <img src="https://user-images.githubusercontent.com/56504893/116789839-2c651280-aac6-11eb-99e0-b43b608ed8c7.png" width="270" alt="Screenshot">
</p>

The example in the screenshots: https://snack.expo.dev/8mHmLfcZf

# Documentation
**The documentation has been moved to https://hossein-zare.github.io/react-native-dropdown-picker-website/**

# Merge and Release Process

## Branches in use

### Development

PRs should be made against and merged into the [`dev-5.x`](https://github.com/hossein-zare/react-native-dropdown-picker) branch, which is set as the `default` branch on github.

### Release

Releases are currently made from the [`5.x`](https://github.com/hossein-zare/react-native-dropdown-picker/tree/5.x) branch.

## Release Process

To make a new release, follow these steps:

* Verify the development branch has all the changes desired in a release and works well
* Make and merge a final PR into development branch that increments the version number in `package.json`
* Make and merge a PR from the development branch to the release branch
* Using the GitHub web UI, draft a new release using tag name `vx.x.x` (replace the `x` values as appropriate of course), with the release branch as the target, with release name `vx.x.x` (again, with appropriate numbers in place of `x` of course)
* Verify in the GitHub Actions panel for the repository that NPM publish succeeded

### Example code with adding a new item/option 

I tried adding this section as a new tutirial to the documentation website. However, I failed. While on the last page of the documentation, I clicking on `Edit this page`, which leads to `https://hossein-zare.github.io/react-native-dropdown-picker-website/versioned_docs/version-5.4/tutorials/multiple-pickers.md`. The page is NOT found. Moreover, if the previous step worked, I don't think I would be able to add a new section. So, if you like the following example, please, (1) let me know how I can add it to the documentation, or (2) add it yourself. It took me a while to figure out how this functionality can be achieved. I think an example woud be usefult to others. 

Example code with adding a new item/option to the list of items/options, which the user selects from. 
```javascript
const ExampleScreen = () => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null); 
	const [items, setItems] = useState([
		{label: "North America", value: "North America"},
		{label: "Europe", value: "Europe"},
	]);
	
	return (
	<DropDownPicker
		open={open} 			
		value={value} 			
		items={items}			
		searchable={true}
		addCustomItem={true} 
		setItems={setItems}
		setValue={setValue}
		setOpen={setOpen}			
	/>
	);	
}; 
```
