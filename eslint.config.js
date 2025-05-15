import js from '@eslint/js';
import globals from 'globals';
import pluginJest from 'eslint-plugin-jest';

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...pluginJest.environments.globals
      },
    },
    plugins: {
      jest: pluginJest,
    },
  },
  {
    files: ['**/__tests__/**/*.{js,mjs,cjs}', '**/?(*.)+(spec|test).{js,mjs,cjs}'],
    rules: {
      // Можно добавить правила для тестов
    },
  },
];