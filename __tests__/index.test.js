import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  let expectedStylish;
  let expectedPlain;
  let expectedJson;

  beforeAll(() => {
    expectedStylish = readFile('expectedStylish.txt').trim();
    expectedPlain = readFile('expectedPlain.txt').trim();
    expectedJson = JSON.parse(readFile('expectedJson.txt'));
  });

  test('should work with JSON format in stylish format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
  });

  test('should work with JSON format in plain format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
  });

  test('should work with YAML format in stylish format', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
  });

  test('should work with YAML format in plain format', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
  });

  test('should work with JSON format in json format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(JSON.parse(genDiff(filepath1, filepath2, 'json'))).toEqual(expectedJson);
  });

  test('should throw error with unknown format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(() => genDiff(filepath1, filepath2, 'unknown')).toThrow('Unknown format: unknown');
  });
});
