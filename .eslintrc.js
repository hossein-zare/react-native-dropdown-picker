module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'react',
        "react-hooks",
        "react-native",
        "prettier",
        "jsx-a11y",
        "eslint-comments",
        "import"
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript',
        "airbnb",
        "airbnb/hooks",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react-native/all",
        "prettier",
        "plugin:prettier/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:eslint-comments/recommended",
        "plugin:import/errors",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript"
    ],
    env: {
        node: true,
        "react-native/react-native": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2020,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "rules": {
        "@typescript-eslint/no-explicit-any": ["error", { "ignoreRestArgs": false, "fixToUnknown": false }],
        "import/no-unresolved": 0,
        "react/jsx-filename-extension": [1, {
            "extensions": [
                ".ts",
                ".tsx",
                ".js",
                ".jsx"
            ]
        }],
        "prettier/prettier": [
            "error",
            {
                // documented at: https://prettier.io/docs/en/configuration.html
                "printWidth": 80,
                "tabWidth": 2,
                "useTabs": false,
                "semi": true,
                "singleQuote": true,
                "quoteProps": "consistent",
                "jsxSingleQuote": true,
                "trailingComma": "all",
                "bracketSpacing": true,
                "jsxBracketSameLine": true,
                "arrowParens": "always",
                "requirePragma": false,
                "insertPragma": false,
                "proseWrap": "preserve",
                "htmlWhitespaceSensitivity": "css",
                "endOfLine": "lf",
                "embeddedLanguageFormatting": "auto"
            }
        ],
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "import/extensions": ["error", "never"],
        "react/prop-types": 0,
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "no-undef": "off"
    },
    "ignorePatterns": [".eslintrc.js"]
};
