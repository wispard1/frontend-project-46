function isComplexValue(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const formatValue = value => {
  if (value === undefined) return 'undefined'
  if (isComplexValue(value)) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`

  return String(value)
}

const handlers = {
  nested: (node, path) => genPlainDesc(node.children, path),
  removed: (node, path) => [`Property '${path}' was removed`],
  added: (node, path) => [
    `Property '${path}' was added with value: ${formatValue(
      node.value ?? node.newValue,
    )}`,
  ],
  changed: (node, path) => [
    `Property '${path}' was updated. From ${formatValue(
      node.oldValue,
    )} to ${formatValue(node.newValue)}`,
  ],
  unchanged: () => [],
}

function genPlainDesc(astNode, ancestors = []) {
  const keys = Object.keys(astNode).sort()
  const lines = []

  for (const key of keys) {
    const node = astNode[key]
    const path = [...ancestors, key].join('.')

    const handler = handlers[node.type]
    if (handler) {
      const result = node.type === 'nested' ? handler(node, [...ancestors, key]) : handler(node, path)
      lines.push(...result)
    }
  }

  return lines.flat()
}

export default function plain(ast) {
  return genPlainDesc(ast).join('\n')
}
