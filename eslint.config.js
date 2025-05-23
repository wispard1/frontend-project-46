import pluginJest from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  {
    ignores: ['coverage/**', 'coverage/'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...Object.fromEntries(
          Object.keys({
            ...globals.browser,
            ...pluginJest.environments.globals,
          }).map((key) => [key, 'writable'])
        ),
      },
    },
    plugins: {
      jest: pluginJest,
    },
    rules: {
      'no-unused-expressions': 'off',
    },
  },
  {
    files: ['**/__tests__/**/*.{js,mjs,cjs}', '**/?(*.)+(spec|test).{js,mjs,cjs}'],
    rules: {},
  },
];