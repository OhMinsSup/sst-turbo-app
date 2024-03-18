const config = require('@tooling/eslint-config/react');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'unicorn/filename-case': 'off',
    'import/order': 'off',
    'import/no-named-as-default-member': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
