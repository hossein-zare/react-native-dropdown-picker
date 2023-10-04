#!/bin/bash

if [ $# -ne 1 ] || [ "$1" != "-y" ]
# if num arguments supplied !== 1 or single argument supplied !== "-y"
# give feedback to user and check they want to run the script
  then
    echo "This script will automatically update this library's dependencies and reformat its code😃"
    echo "In the future, pass a single argument of \"-y\" to assume \"yes\" as the answer to the prompt and run non-interactively."

    while [ "$yn" != "Y" ] && [ "$yn" != "y" ] && [ "$yn" != "N" ] && [ "$yn" != "n" ]
    do

      read -r -p "Do you wish run this script? (y/n): " yn
      case $yn in
          [Yy]* ) echo "Running script";;
          [Nn]* ) echo "Exiting script"; exit 0;;
          * ) echo "Please answer y for yes or n for no.";;
      esac

    done
fi

echo "🚀 Script starting. This library's dependencies will be updated and its code will be reformatted. Go get a coffee or sit back and relax!"

echo "🔄 Step 1 of 2: updating dependencies."

echo "🔄 Updating dependencies, part 1 of 3: pulling from git."

git fetch
git pull

echo "🔄 Updating dependencies, part 2 of 3: updating dependencies of examples subdirectory."

cd examples || exit 1
npx --yes npm-check-updates -u --timeout 400000
npm update
npm audit fix
npm install expo@latest
npx --yes expo install --fix
npx --yes sort-package-json
npm install
npx --yes expo install --check

echo "🔄 Updating dependencies, part 3 of 3: updating dependencies of react-native-dropdown-picker."

cd .. || exit 1
npx --yes npm-check-updates -u --timeout 400000
npm update
npm audit fix
npx --yes sort-package-json
npm install

echo "✍️ Step 2 of 2: Reformatting code."

echo "✍️ Reformatting code, part 1 of 2: starting first pass."

npx eslint --fix . --config .eslintrc.yaml --ignore-path .eslintignore
npx prettier --write . --config .prettierrc.yaml --ignore-path .prettierignore

echo "✍️ Reformatting code, part 2 of 2: starting second pass."

npx eslint --fix . --config .eslintrc.yaml --ignore-path .eslintignore
npx prettier --write . --config .prettierrc.yaml --ignore-path .prettierignore

echo "✅ Done!"