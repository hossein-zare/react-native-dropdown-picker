import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import json from 'eslint-plugin-json';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // Replaces .eslintignore
  {
    ignores: [
      'package-lock.json',
      'build/**',
      'dist/**',
      'coverage/**',
      '.github/**',
      '.idea/**',
      '.vscode/**',
    ],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended + stylistic (flat config variants)
  ...tsPlugin.configs['flat/recommended'],
  ...tsPlugin.configs['flat/stylistic'],

  // ESLint comments — configured manually since configs.recommended uses legacy plugin format
  {
    plugins: {
      '@eslint-community/eslint-comments': eslintComments,
    },
    rules: eslintComments.configs.recommended.rules,
  },

  // Import plugin (flat config variants)
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,

  // JSDoc (flat config variant)
  jsdoc.configs['flat/recommended'],

  // JSON files (flat config, already includes `files` pattern)
  json.configs.recommended,

  // JSX accessibility (flat config variant)
  jsxA11y.flatConfigs.recommended,

  // React hooks (flat config variant)
  reactHooks.configs['recommended-latest'],

  // React (flat config variant)
  react.configs.flat.recommended,

  // Prettier — disables formatting rules that conflict with prettier (must be last)
  prettierConfig,

  // Project-specific configuration
  {
    plugins: {
      'react-native': reactNative,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        project: './tsconfig.json',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        // React Native globals (__DEV__, alert, fetch, etc.)
        ...reactNative.environments['react-native'].globals,
        JSX: 'readonly',
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // React Native
      'react-native/no-inline-styles': 'warn',

      // TypeScript
      '@typescript-eslint/array-type': ['error', { default: 'generic', readonly: 'generic' }],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: false, ignoreRestArgs: false }],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-use-before-define': 'error',

      // General
      camelcase: 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'comma-style': ['error', 'last'],
      'import/extensions': ['error', 'never'],
      'import/no-unresolved': 'error',
      'jsdoc/check-indentation': 'error',
      'jsdoc/no-bad-blocks': 'error',
      'jsdoc/require-description': 'error',
      'jsdoc/require-file-overview': 'error',
      'jsdoc/require-throws': 'error',
      'jsx-quotes': ['error', 'prefer-single'],
      'linebreak-style': ['error', 'unix'],
      'max-lines': ['error', 300],
      'max-lines-per-function': ['warn', { max: 20 }],
      'no-console': 'error',
      'no-duplicate-imports': 'error',
      'no-multi-spaces': 'error',
      'no-shadow': 'error',
      'no-template-curly-in-string': 'error',
      'no-trailing-spaces': 'error',
      'no-undef': 'error',
      'no-use-before-define': 'warn',
      'react/jsx-filename-extension': ['error', { extensions: ['.ts', '.tsx', '.js', '.jsx'] }],
      'react/prop-types': 'error',
      'sort-imports': 'warn',
      'sort-keys': ['error', 'asc', { caseSensitive: true, minKeys: 2, natural: true }],
    },
  },
];
