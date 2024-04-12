const config = require('@tooling/eslint-config/base');
const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  parserOptions: {
    ...config.parserOptions,
    project,
  },
  rules: {
    ...config.rules,
    'no-bitwise': 'off',
    'no-console': 'off',
    'import/order': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
  },
};
