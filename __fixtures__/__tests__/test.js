import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import file1 from '../file1.json';
import file2 from '../file2.json';
import gendiff, { buildDiff } from '../../src/index.js';
import parser from '../../src/parser.js';
import { parse } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const etalonStylish = fs
  .readFileSync(path.resolve(__dirname, '../etalonStylish.txt'), 'utf-8')
  .replace(/\r\n/g, '\n')
  .trim();

test('test buildDiff', () => {
  const result = buildDiff(file1, file2);
  expect(result).toEqual(etalonStylish);
});

test('test genDiff', () => {
  const result = gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json');
  expect(result).toEqual(etalonStylish);
});

test('test parse', () => {
  expect(parser(file1, 'json')).toEqual(JSON.parse(file1));
  expect(parser(file1, 'yml')).toEqual(parse(file1));
  expect(parser(file1, 'txt')).toEqual(`Unsupported file extension 'txt'`);
})