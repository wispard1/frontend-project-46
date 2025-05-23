import pluginJest from 'eslint-plugin-jest'
import stylistic from '@stylistic/eslint-plugin'
import pluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      '@stylistic': stylistic,
      'jest': pluginJest,
      'prettier': pluginPrettier,
    },
    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/brace-style': ['error', 'stroustrup'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      'no-unused-expressions': 'off',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'warn',
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
