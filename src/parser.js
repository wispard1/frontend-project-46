import { parse } from 'yaml'

export default function parser(data, format) {
  if (typeof data !== 'string') {
    throw new TypeError('Data must be a string')
  }

  switch (format) {
    case 'json':
      return JSON.parse(data)
    case 'yaml':
    case 'yml':
      return parse(data)
    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}
