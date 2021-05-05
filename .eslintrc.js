module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'react',
        "react-hooks",
        "react-native"
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react-native/all"
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
        "@typescript-eslint/no-explicit-any": ["error"]
    }
};