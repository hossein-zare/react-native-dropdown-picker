# React Native Dropdown Picker 5.x

<p float="left">
    <img src="https://user-images.githubusercontent.com/56504893/116790110-e0b36880-aac7-11eb-9ebd-196acee64f7a.png" width="270" alt="Screenshot">
    <img src="https://user-images.githubusercontent.com/56504893/116789802-faec4700-aac5-11eb-837b-86f18cbfcf3d.png" width="270" alt="Screenshot">
    <img src="https://user-images.githubusercontent.com/56504893/116789839-2c651280-aac6-11eb-99e0-b43b608ed8c7.png" width="270" alt="Screenshot">
</p>

# Documentation
**The documentation has been moved to https://hossein-zare.github.io/react-native-dropdown-picker-website/**

# Caution
Previous versions of this package are deprecated and incompatible with the current version.

# Contribution
If you want to contribute to this package, Create a new issue and let us know about it.

# Donation
We are constantly working to improve this project, help us with your donation as a "Thank you"!

**Donate Bitcoin**
+ **Payment Address:** `bc1q7sgzww3l0fk3dyy9mzcjxdw9rla3yvhuyf0qku`  
![QR Code](https://user-images.githubusercontent.com/56504893/116758583-a0031300-aa25-11eb-9624-0009346d2290.png)

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
