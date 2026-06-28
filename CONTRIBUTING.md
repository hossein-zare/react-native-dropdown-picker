# 💖 Contributing to [React Native Dropdown Picker](https://github.com/hossein-zare/react-native-dropdown-picker)

Thank you for considering contributing to this library! This guide will walk you
through how to do so successfully 😃

## 🤔 Overview

### 🌍 General guidance

You should
read [GitHub's general guidance on contributing to projects](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)
and [guidance on collaborating with pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests).

### 📄 Documentation

Good and thorough documentation is important to enabling people to use a
library. Therefore, it would be greatly appreciated if
you [contributed to this library's documentation](https://github.com/hossein-zare/react-native-dropdown-picker-website).

### 🧪 Experimenting

To easily and quickly test changes before needing to add them to version
control or submit them for acceptance into this library, you can
use [patch-package](https://www.npmjs.com/package/patch-package). It will let
you edit this library in your own project's npm dependencies to see which
changes work.

## 🛠️ How to contribute changes

### ✅ Sensibility

Read [this library's docs](https://hossein-zare.github.io/react-native-dropdown-picker-website/docs)
and
search [its GitHub issues](https://github.com/hossein-zare/react-native-dropdown-picker/issues)
to ensure your intended changes make sense.

### 🚩 Make an issue

Before submitting any changes, document them
in [an issue](https://github.com/hossein-zare/react-native-dropdown-picker/issues/new/choose).
For example, this might be a feature request issue for the feature you will
create or a bug report for the bug you will fix. If the issue already exists,
e.g. a bug report for the same bug you'll fix or a feature request for the same
feature you're building, skip this step. Don't make a duplicate issue.

### 🍴 Forking

To start work on your changes to be
submitted, [fork and clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
this library. You should
then [create a new branch](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
on your fork dedicated to the changes you're making. You should
read [GitHub's docs about branches](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches).
Make sure you use a separate branch (⇒ PR) for each atomic change (e.g. adding
one feature or fixing one bug) you are making. If you want to make multiple, do
so in separate branches, and submit them in separate PRs. Otherwise, your PRs
will bloat, and it will be hard to review, manage, and keep track of them.

### 👩🏾‍💻 Make changes

Make the changes you require to this library in your fork. Test them
with `npm pack`. It will let you build this library as if for release on npm
locally, so you can include it as a dependency in another npm package to test
it.
Read [this article](https://dev.to/scooperdev/use-npm-pack-to-test-your-packages-locally-486e)
for more information on how to use `npm pack` to test your changed version of
this library locally.

Once you have ensured your changes work as
required, [commit your changes](https://git-scm.com/docs/git-commit)
and [push them to your fork](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository).
Then ensure that your changes pass
our [continuous integration (CI) workflow](https://docs.github.com/en/actions/automating-builds-and-tests/about-continuous-integration).
They will show up to you
as [status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks).
To do this, you may need
to [fix ESLint issues](https://eslint.org/docs/latest/use/command-line-interface#--fix)
and [reformat your code with Prettier](https://prettier.io/docs/en/cli#--write).

Use the script `update_reformat.sh` to automatically update this library's
dependencies and reformat its code. This will help you pass our CI checks.

Whenever applicable, add or update automated tests to check your changes work
and that they will continue to do so in the future. You
should [squash the commits you made](https://www.geeksforgeeks.org/git-squash/)
containing your changes into one single commit that conforms
to [the Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/#summary).

Ensure your changes are up-to-date with those in the `dev-5.x` (default) branch.
This will mean your commit will come immediately after the last one in
the `dev-5.x` (default) branch if you
run [git log](https://git-scm.com/docs/git-log).
Read [GitHub's guidance on keeping your pull request in sync with the base branch](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/keeping-your-pull-request-in-sync-with-the-base-branch).
Doing this will prevent merge conflicts that will stop your changes being able
to be merged.

Once you've done all this, you're ready to submit a Pull Request (PR).

### 🚀 Make a Pull Request

To submit your changes for review and to have them added to this library, you
must make
a [pull request (PR)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).
You will be ready to do so after following the instructions in the "Make
changes" section.

You can make a PR into this
library [here](https://github.com/hossein-zare/react-native-dropdown-picker/compare).
Ensure
you [link the issue you made earlier (and any others that are relevant) to your PR](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#manually-linking-a-pull-request-to-an-issue-using-the-pull-request-sidebar).

PRs should be made against and merged into
the [`dev-5.x`](https://github.com/hossein-zare/react-native-dropdown-picker)
branch, which is set as the `default` branch on GitHub.

You can also make
a [draft PR](https://github.blog/2019-02-14-introducing-draft-pull-requests/)
before the changes are completely finished as per the "Make changes" section.
This might be useful if you need feedback on your changes early on and before
finalizing for merging.

Once you have made a PR, you will then get feedback from the maintainers of the
repo. This will help ensure your changes are ready to be merged.

If required, make a separate
PR [in the docs](https://github.com/hossein-zare/react-native-dropdown-picker-website)
if your changes make its contents incorrect or if information regarding your
changes is missing from them altogether.

## 🏁 Release process

Releases are currently made from
the [`5.x`](https://github.com/hossein-zare/react-native-dropdown-picker/tree/5.x)
branch. To make a new release, follow these steps:

1. Verify the development branch has all the changes desired in the release and
   works well
2. Make and merge a final PR into the development branch that increments the
   version number in `package.json`
3. Make and merge a PR from the development branch to the release branch
4. Using the GitHub web UI, draft a new release using the tag name `vx.x.x`
   (replace the `x` values as appropriate). Use the release branch as the
   target, with the release name being `vx.x.x` (again, with appropriate
   numbers in place of `x`)
5. Verify in the GitHub Actions panel for the repository that `npm publish`
   succeeded
