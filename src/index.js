import path from 'path';
import fs from 'fs';
import parser from './parser.js';
import formatData from './formatters/index.js';

export default function gendiff(filepath1, filepath2, formatName = 'stylish') {
  const ext1 = path.extname(filepath1).slice(1);
  const ext2 = path.extname(filepath2).slice(1);

  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

  const parsed1 = parser(content1, ext1);
  const parsed2 = parser(content2, ext2);

  return formatData(parsed1, parsed2, formatName);
}
