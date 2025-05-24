import pluginJest from 'eslint-plugin-jest'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

export default [
  {
    ignores: ['**/node_modules/**', 'coverage/**'],
  },
  js.configs.recommended,
  prettierConfig,
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
      prettier,
    },
    rules: {
      'no-unused-vars': 'error',
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/brace-style': 'off',
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'only-multiline'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/no-trailing-spaces': ['error'],
      '@stylistic/spaced-comment': ['error', 'always'],
      'no-unused-expressions': 'off',
      'no-undef': 'error',
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'es5',
          printWidth: 80,
          tabWidth: 2,
          bracketSpacing: true,
          arrowParens: 'always',
          endOfLine: 'auto',
        },
      ],
    },
  },
  {
    files: [
      '**/__tests__/**/*.{js,mjs,cjs}',
      '**/?(*.)+(spec|test).{js,mjs,cjs}',
    ],
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
]
