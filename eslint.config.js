import pluginJest from 'eslint-plugin-jest'
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      '@stylistic': stylistic,
      'jest': pluginJest,
    },
    rules: {
      // Стилевые правила
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/brace-style': ['error', 'stroustrup'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
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
