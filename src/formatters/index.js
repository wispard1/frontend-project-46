import plain from './plain.js'
import stylish from './stylish.js'
import json from './json.js'

const formatData = (obj1, obj2, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(obj1, obj2)
    case 'plain':
      return plain(obj1, obj2)
    case 'json':
      return json(obj1, obj2)
    default:
      throw new Error(`Unknown format: ${format}`)
  }
}

export default formatData