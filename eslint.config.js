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

      '@stylistic/semi': ['error', 'never'],       // ❌ Точки с запятой не нужны
      '@stylistic/no-extra-semi': 'error',         // 🔍 Ловим лишние точки с запятой
      '@stylistic/arrow-parens': ['error', 'always'], // 📦 Скобки вокруг аргументов стрелочных функций
      '@stylistic/comma-dangle': ['error', 'only-multiline'], // 📝 Запятые только в многострочных объектах
      '@stylistic/operator-linebreak': ['error', 'before'], // ⬆ Перенос операторов на новую строку
      '@stylistic/eol-last': ['error', 'always'],  // 📄 Нужна пустая строка в конце файла
      '@stylistic/indent': ['error', 2],           // 💡 Отступы по 2 пробела
      '@stylistic/no-trailing-spaces': ['error'],  // 🧹 Не должно быть пробелов в конце строки
      '@stylistic/spaced-comment': ['error', 'always'], // 💬 Пробел после //
      '@stylistic/quote-props': ['error', 'as-needed'], // 📝 Кавычки только при необходимости
      '@stylistic/brace-style': ['error', 'stroustrup'], // 🔷 Фигурные скобки на новой строке
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
