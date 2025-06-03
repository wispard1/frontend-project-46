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

const formatLine = (prefix, key, value, currentIndent, depth, indentSize) => {
  const rendered = stringify(value, depth, indentSize)
  return `${currentIndent.slice(0, -2)}${prefix}${key}: ${rendered}`
}

const handlers = {
  added: (key, node, currentIndent, depth, indentSize) =>
    formatLine('+ ', key, node.value, currentIndent, depth, indentSize),
  removed: (key, node, currentIndent, depth, indentSize) =>
    formatLine('- ', key, node.value, currentIndent, depth, indentSize),
  unchanged: (key, node, currentIndent, depth, indentSize) =>
    `${currentIndent}${key}: ${stringify(node.value, depth, indentSize)}`,
  changed: (key, node, currentIndent, depth, indentSize) => [
    formatLine('- ', key, node.oldValue, currentIndent, depth, indentSize),
    formatLine('+ ', key, node.newValue, currentIndent, depth, indentSize),
  ],
  nested: (key, node, currentIndent, depth, indentSize) =>
    `${currentIndent}${key}: ${stylish(node.children, depth + 1, indentSize)}`,
}

const stylish = (ast, depth = 1, indentSize = 4) => {
  const currentIndent = getIndent(depth, indentSize)
  const bracketIndent = getIndent(depth - 1, indentSize)

  const lines = Object.entries(ast).flatMap(([key, node]) => {
    const handler = handlers[node.type]
    if (!handler) {
      throw new Error(`Unknown type: ${node.type}`)
    }
    return handler(key, node, currentIndent, depth, indentSize)
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

export default stylish
