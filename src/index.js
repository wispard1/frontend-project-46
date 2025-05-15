import path from 'path';
import fs from 'fs';
import parser from './parser.js';

const buildDiff = (obj1, obj2, depth = 0) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();

  const space = 4;
  const indent = ' '.repeat(depth * space);

  const changeIndent = ' '.repeat(depth * space + 2);
  const sameIndent = ' '.repeat(depth * space + 4);

  const diff = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 !== null) {
      const nestedDiff = gendiff(value1, value2, depth + 1);

      return `${sameIndent}${key}: ${nestedDiff}`;
    }

    if (typeof value1 === 'object' && value1 !== null && (typeof value2 !== 'object' || value2 === null)) {
      const nestedDiff = gendiff(value1, {}, depth + 1);

      return `${changeIndent}- ${key}: ${nestedDiff}\n${changeIndent}+ ${key}: ${value2}`;
    }

    if (typeof value2 === 'object' && value2 !== null && (typeof value1 !== 'object' || value1 === null)) {
      const nestedDiff = gendiff({}, value2, depth + 1);

      return `${changeIndent}- ${key}: ${value1}\n${changeIndent}+ ${key}: ${nestedDiff}`;
    }

    if (!Object.hasOwn(obj2, key)) {
      return `${changeIndent}- ${key}: ${value1}`;
    }
    if (!Object.hasOwn(obj1, key)) {
      return `${changeIndent}+ ${key}: ${value2}`;
    }
    if (value1 !== value2) {
      return `${changeIndent}- ${key}: ${value1}\n${changeIndent}+ ${key}: ${value2}`;
    }

    return `${sameIndent}${key}: ${value1}`;
  });

  return `{\n${diff.join('\n')}\n${indent}}`;
};

export default function gendiff(filepath1, filepath2) {
  const ext1 = path.extname(filepath1).slice(1);
  const ext2 = path.extname(filepath2).slice(1);

  const content1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const content2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');

  const parsed1 = parser(content1, ext1);
  const parsed2 = parser(content2, ext2);

  return buildDiff(parsed1, parsed2);
}

export { buildDiff };


