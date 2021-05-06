module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'react',
        "react-hooks",
        "react-native",
        "jsx-a11y"
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react-native/all",
        "plugin:jsx-a11y/strict"
    ],
    env: {
        node: true,
        "react-native/react-native": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "@typescript-eslint/no-explicit-any": ["error", { "ignoreRestArgs": false, "fixToUnknown": false }]
    }
};
