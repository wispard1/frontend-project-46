export default function json(ast) {
  const result = {
    added: [],
    removed: [],
    unchanged: [],
    updated: [],
  }

  function traverse(node, key, path = []) {
    const nodeKey = key

    if (node.type === 'nested') {
      Object.entries(node.children).forEach(([childKey, child]) => {
        traverse(child, childKey, [...path, key])
      })
    }
    if (node.type === 'added') {
      result.added.push({ key: nodeKey, value: node.value })
    }
    if (node.type === 'removed') {
      result.removed.push({ key: nodeKey, value: node.value })
    }
    if (node.type === 'unchanged') {
      result.unchanged.push({ key: nodeKey, value: node.value })
    }
    if (node.type === 'changed') {
      result.updated.push({
        key: nodeKey,
        from: node.oldValue,
        to: node.newValue,
      })
    }
  }

  Object.entries(ast).forEach(([key, node]) => traverse(node, key, []))

  return result
}
