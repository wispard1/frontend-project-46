import js from '@eslint/js'
import pluginJest from 'eslint-plugin-jest'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
  {
    ignores: ['**/node_modules/**', 'coverage/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.vitest,
      },
    },
    plugins: {
      '@stylistic': stylistic,
      jest: pluginJest,
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-unused-expressions': 'off',
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/brace-style': ['error', 'stroustrup', { allowSingleLine: false }],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/operator-linebreak': ['error', 'before'],
      '@stylistic/comma-dangle': ['error', 'only-multiline'],
    },
  },
  {
    files: ['**/__tests__/**/*.{js,mjs,cjs}', '**/?(*.)+(spec|test).{js,mjs,cjs}'],
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
]