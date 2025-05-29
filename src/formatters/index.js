import plain from './plain.js'
import stylish from './stylish.js'
import json from './json.js'

const formatData = (ast, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(ast)
    case 'plain':
      return plain(ast)
    case 'json':
      return json(ast)
    default:
      throw new Error(`Unknown format: ${format}`)
  }
}

export default formatData
