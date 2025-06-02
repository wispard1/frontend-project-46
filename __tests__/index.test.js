import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { readFileSync } from 'fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

const expectedStylish = readFileSync(
  getFixturePath('expectedStylish.txt'),
  'utf-8',
)
const expectedPlain = readFileSync(getFixturePath('expectedPlain.txt'), 'utf-8')
const expectedJson = readFileSync(getFixturePath('expectedJson.txt'), 'utf-8')

describe('genDiff', () => {
  test.each([
    {
      description: 'JSON files with stylish format',
      file1: 'file1.json',
      file2: 'file2.json',
      format: 'stylish',
      expected: expectedStylish,
    },
    {
      description: 'JSON files with plain format',
      file1: 'file1.json',
      file2: 'file2.json',
      format: 'plain',
      expected: expectedPlain,
    },
    {
      description: 'YAML files with stylish format',
      file1: 'file1.yml',
      file2: 'file2.yml',
      format: 'stylish',
      expected: expectedStylish,
    },
    {
      description: 'YAML files with plain format',
      file1: 'file1.yml',
      file2: 'file2.yml',
      format: 'plain',
      expected: expectedPlain,
    },
    {
      description: 'JSON files with json format',
      file1: 'file1.json',
      file2: 'file2.json',
      format: 'json',
      expected: expectedJson,
    },
  ])('description', ({ file1, file2, format, expected }) => {
    const filepath1 = getFixturePath(file1)
    const filepath2 = getFixturePath(file2)

    if (format === 'json') {
      const actual = JSON.parse(genDiff(filepath1, filepath2, format))
      const expectedObj = JSON.parse(expected)
      expect(actual).toEqual(expectedObj)
    } else {
      expect(genDiff(filepath1, filepath2, format)).toEqual(expected)
    }
  })

  test('should throw error with unknown format', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    expect(() => genDiff(filepath1, filepath2, 'unknown')).toThrow(
      'Unknown format: unknown',
    )
  })
})
