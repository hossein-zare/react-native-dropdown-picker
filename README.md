# React Native Dropdown Picker 5.x

## Screenshots

<p float="left">
    <img src="https://user-images.githubusercontent.com/56504893/116790110-e0b36880-aac7-11eb-9ebd-196acee64f7a.png" width="270" alt="Screenshot">
    <img src="https://user-images.githubusercontent.com/56504893/116789802-faec4700-aac5-11eb-837b-86f18cbfcf3d.png" width="270" alt="Screenshot">
    <img src="https://user-images.githubusercontent.com/56504893/116789839-2c651280-aac6-11eb-99e0-b43b608ed8c7.png" width="270" alt="Screenshot">
</p>

The above screenshots are taken from the following
example: [https://snack.expo.dev/8mHmLfcZf](https://snack.expo.dev/8mHmLfcZf)

## Documentation

The docs can be read
at: [https://hossein-zare.github.io/react-native-dropdown-picker-website](https://hossein-zare.github.io/react-native-dropdown-picker-website)

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
* Use `npm pack` to test the new version of the library locally and check it
  works correctly;
  see [https://dev.to/scooperdev/use-npm-pack-to-test-your-packages-locally-486e](https://dev.to/scooperdev/use-npm-pack-to-test-your-packages-locally-486e)
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
