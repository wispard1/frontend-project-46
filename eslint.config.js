/* eslint-disable */

import js from '@eslint/js'
import pluginJest from 'eslint-plugin-jest'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
  {
    ignores: [
      '**/node_modules/**',
      'coverage/**',
      '__fixtures__/**',
      'reports/**',
      '**/*.yml',
      '**/*.md',
      '**/*.lock',
      '**/.git',
      '**/.github'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.vitest
      }
    },
    plugins: {
      '@stylistic': stylistic,
      jest: pluginJest
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-unused-expressions': 'off',

      '@stylistic/semi': ['error', 'never'],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      // '@stylistic/brace-style': [
      //   'error',
      //   'stroustrup',
      //   { allowSingleLine: false }
      // ],
      '@stylistic/quote-props': ['error', 'always'],
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/no-trailing-spaces': ['error'],
      '@stylistic/spaced-comment': ['error', 'always'],
      '@stylistic/no-multi-spaces': 'off',
      '@stylistic/quote-props': ['error', 'as-needed']
    }
  },
  {
    files: [
      '**/__tests__/**/*.{js,mjs,cjs}',
      '**/?(*.)+(spec|test).{js,mjs,cjs}'
    ],
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
  }
]
