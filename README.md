# Вычислитель отличий

### Hexlet tests and linter status:

[![Actions Status](https://github.com/wispard1/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/wispard1/frontend-project-46/actions)

### SonarQube Test Coverage

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=wispard1_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=wispard1_frontend-project-46)

### Установка и запуск проекта
Чтобы установить и запустить проект локально, следуйте этим шагам:
1. **Клонируйте репозиторий**<br>
`git clone https://github.com/wispard1/frontend-project-46.git`<br>
`cd frontend-project-46`

2. **Установите зависимости**
npm install

3. **Запустите тесты**
npm run test

4. **Используйте CLI** (опционально)

Чтобы использовать команду gendiff, необходимо прописать `npm link`

**По умолчанию (формат stylish)**<br>
`gendiff __fixtures__/file1.json __fixtures__/file2.json`

**С указанием формата:**<br>
`gendiff --format json __fixtures__/file1.json __fixtures__/file2.json`<br>
или<br>
`gendiff --format plain __fixtures__/file1.json __fixtures__/file2.json`

### Рекурсивное сравнение (JSON и YAML)

[Посмотреть запись](https://asciinema.org/a/XOQAGJvdySFoMQyCyfnCkNLL2)

### Вывод в json

[Посмотреть запись](https://asciinema.org/a/Rj4Zuf3eFv5gN9DH2ahm0CJBv)

### Плоский формат (plain)

[Посмотреть запись](https://asciinema.org/a/psU2MrSj22hpvd1uKeAqZY5f6)
