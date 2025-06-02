export default function json(ast) {
  const result = {
    added: [],
    removed: [],
    unchanged: [],
    updated: [],
  }

  function traverse(node, key, path = []) {
    const fullPath = [...path, key].join('.')

    if (node.type === 'nested') {
      Object.entries(node.children).forEach(([childKey, child]) => {
        traverse(child, childKey, [...path, key])
      })
      return
    }

    if (node.type === 'added') {
      result.added.push({ key: fullPath, value: node.value })
    }
    if (node.type === 'removed') {
      result.removed.push({ key: fullPath, value: node.value })
    }
    if (node.type === 'unchanged') {
      result.unchanged.push({ key: fullPath, value: node.value })
    }
    if (node.type === 'changed') {
      result.updated.push({
        key: fullPath,
        from: node.oldValue,
        to: node.newValue,
      })
    }
  }

  Object.entries(ast).forEach(([key, node]) => traverse(node, key, []))

  return JSON.stringify(result, null, 2)
}
