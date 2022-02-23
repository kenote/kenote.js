module.exports = {
  extends: [
    'standard-ts'
  ],
  parserOptions: {
    project: './tsconfig.lint.json'
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/dot-notation': ['off'],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/return-await': 'off',
    'node/handle-callback-err': 'off',
    'no-trailing-spaces': 'off',
    'no-useless-escape': 'off',
    'no-useless-catch': 'off',
    'padded-blocks': ['off'],
    'prefer-const': 'off',
    'comma-dangle': 'off',
    'eol-last': 'off'
  }
}
