const getIndent = (depth, indentSize = 4) => ' '.repeat(depth * indentSize)

const stringify = (value, depth, indentSize = 4) => {
  if (value === '') return ''

  if (typeof value !== 'object' || value === null) {
    return value === null ? 'null' : String(value)
  }

  const indent = getIndent(depth + 1, indentSize)
  const bracketIndent = getIndent(depth, indentSize)

  const entries = Object.entries(value).map(([key, val]) => {
    const rendered = stringify(val, depth + 1, indentSize)
    const spacer = rendered === '' ? '' : ' '
    return `${indent}${key}:${spacer}${rendered}`
  })

  return `{\n${entries.join('\n')}\n${bracketIndent}}`
}

const stylish = (ast, depth = 1, indentSize = 4) => {
  const currentIndent = getIndent(depth, indentSize)
  const bracketIndent = getIndent(depth - 1, indentSize)

  const handlers = {
    added: (key, node) => formatLine('+ ', key, node.value),
    removed: (key, node) => formatLine('- ', key, node.value),
    unchanged: (key, node) =>
      `${currentIndent}${key}: ${stringify(node.value, depth, indentSize)}`,
    changed: (key, node) => [
      formatLine('- ', key, node.oldValue),
      formatLine('+ ', key, node.newValue),
    ],
    nested: (key, node) =>
      `${currentIndent}${key}: ${stylish(node.children, depth + 1, indentSize)}`,
  }

  const formatLine = (prefix, key, value) => {
    const rendered = stringify(value, depth, indentSize)
    return `${currentIndent.slice(0, -2)}${prefix}${key}: ${rendered}`
  }

  const lines = Object.entries(ast).flatMap(([key, node]) => {
    const handler = handlers[node.type]
    if (!handler) {
      throw new Error(`Unknown type: ${node.type}`)
    }
    return handler(key, node)
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

export default stylish
