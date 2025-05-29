const indentSize = 2

function getIndent(depth) {
  return ' '.repeat(indentSize * depth)
}

function formatValue(value, depth) {
  if (value === null) return 'null'
  if (typeof value !== 'object') return String(value)
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    const items = value.map(
      item => `${getIndent(depth + 1)}${formatValue(item, depth + 1)}`
    )
    return `[\n${items.join('\n')}\n${getIndent(depth)}]`
  }

  const keys = Object.keys(value).sort()
  if (keys.length === 0) return '{}'
  const lines = keys.map(
    key =>
      `${getIndent(depth + 1)}${key}: ${formatValue(value[key], depth + 1)}`
  )
  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`
}

function walk(astNode, depth = 0) {
  const lines = []
  const keys = Object.keys(astNode).sort()

  for (const key of keys) {
    const node = astNode[key]
    const baseIndent = getIndent(depth + 1)
    const signIndent = getIndent(depth + 2)

    switch (node.type) {
      case 'nested':
        lines.push(`${baseIndent}${key}: {`)
        lines.push(walk(node.children, depth + 1))
        lines.push(`${baseIndent}}`)
        break

      case 'added':
        lines.push(
          `${signIndent}+ ${key}: ${formatValue(node.value, depth + 2)}`
        )
        break

      case 'removed':
        lines.push(
          `${signIndent}- ${key}: ${formatValue(node.value, depth + 2)}`
        )
        break

      case 'changed':
        lines.push(
          `${signIndent}- ${key}: ${formatValue(node.oldValue, depth + 2)}`
        )
        lines.push(
          `${signIndent}+ ${key}: ${formatValue(node.newValue, depth + 2)}`
        )
        break

      case 'unchanged':
        lines.push(`${baseIndent}${key}: ${formatValue(node.value, depth + 2)}`)
        break
    }
  }

  return lines.join('\n')
}

export default function stylish(ast) {
  return `{\n${walk(ast, 0)}\n}`
}
