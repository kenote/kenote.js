module.exports = {
  root: true,
  extends: [
    'standard-ts'
  ],
  parserOptions: {
    project: './tsconfig.lint.json'
  },
  ignorePatterns: [
    '*.config.js',
    '.eslintrc.js'
  ],
  rules: {
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/type-annotation-spacing': 'off',
    'array-bracket-spacing': 'off',
    'comma-dangle': 'off',
    'eol-last': 'off',
    'key-spacing': 'off',
    'no-multi-spaces': 'off',
    'no-trailing-spaces': 'off',
    'no-useless-catch': 'off',
    'no-useless-escape': 'off',
    'node/handle-callback-err': 'off',
    'padded-blocks': 'off',
    'prefer-const': 'off',
    'space-in-parens': 'off'
  }
}
