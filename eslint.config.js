// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const { fixupPluginRules } = require('@eslint/compat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')
const reactNative = require('eslint-plugin-react-native')

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*', '/.expo', 'node_modules'],
    plugins: {
      'react-native': fixupPluginRules(reactNative),
    },
    rules: {
      'prettier/prettier': 'error',
      // Disallow console.log statements
      'no-console': ['error'],
      // React Native specific rules
      'react-native/no-unused-styles': 'error',
      'react-native/split-platform-components': 'error',
      'react-native/no-single-element-style-arrays': 'error',
    },
  },
])
