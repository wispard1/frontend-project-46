const stringify = (value, depth) => {
  if (value === '') return ''

  if (typeof value !== 'object' || value === null) {
    return value === null ? 'null' : String(value)
  }

  const indent = '    '.repeat(depth + 1)
  const bracketIndent = '    '.repeat(depth)

  const entries = Object.entries(value).map(([key, val]) => {
    const rendered = stringify(val, depth + 1)
    const spacer = rendered === '' ? '' : ' '
    return `${indent}${key}:${spacer}${rendered}`
  })

  return `{\n${entries.join('\n')}\n${bracketIndent}}`
}

const stylish = (ast, depth = 1) => {
  const indentSize = 4
  const currentIndent = ' '.repeat(depth * indentSize)
  const bracketIndent = ' '.repeat((depth - 1) * indentSize)

  const lines = Object.entries(ast).flatMap(([key, node]) => {
    const { type, value, oldValue, newValue, children } = node

    const formatLine = (prefix, val) => {
      const rendered = stringify(val, depth)
      return `${currentIndent.slice(0, -2)}${prefix}${key}: ${rendered}`
    }

    switch (type) {
      case 'added':
        return formatLine('+ ', value)
      case 'removed':
        return formatLine('- ', value)
      case 'unchanged':
        return `${currentIndent}${key}: ${stringify(value, depth)}`
      case 'changed':
        return [formatLine('- ', oldValue), formatLine('+ ', newValue)]
      case 'nested':
        return `${currentIndent}${key}: ${stylish(children, depth + 1)}`
      default:
        throw new Error(`Unknown type: ${type}`)
    }
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

export default stylish
