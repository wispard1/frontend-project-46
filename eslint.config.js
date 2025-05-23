import pluginJest from 'eslint-plugin-jest'
import stylistic from '@stylistic/eslint-plugin'
import pluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      '@stylistic': stylistic,
      jest: pluginJest,
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/arrow-parens': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/brace-style': 'off',

      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'warn',
    },
  },
]
