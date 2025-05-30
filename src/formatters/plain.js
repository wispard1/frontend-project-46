/* eslint-disable no-param-reassign */
function isComplexValue(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const formatValue = value => {
  if (value === undefined) return 'undefined'
  if (isComplexValue(value)) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`

  return String(value)
}

function walk(astNode, ancestors = []) {
  const lines = []
  const keys = Object.keys(astNode).sort()

  for (const key of keys) {
    const node = astNode[key]
    const path = [...ancestors, key].join('.')

    switch (node.type) {
      case 'nested':
        lines.push(walk(node.children, [...ancestors, key]))
        break

      case 'removed':
        lines.push(`Property '${path}' was removed`)
        break

      case 'added':
        lines.push(
          `Property '${path}' was added with value: ${formatValue(
            node.value ?? node.newValue
          )}`
        )
        break

      case 'changed':
        lines.push(
          `Property '${path}' was updated. From ${formatValue(
            node.oldValue
          )} to ${formatValue(node.newValue)}`
        )
        break

      case 'unchanged':
        break
    }
  }

  return lines.flat().join('\n')
}

export default function plain(ast) {
  return walk(ast)
}
