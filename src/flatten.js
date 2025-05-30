export default function flatten(ast) {
  const result = {
    added: [],
    removed: [],
    unchanged: [],
    updated: [],
  }

  function traverse(node, parentKey) {
    if (node.type === 'nested') {
      Object.entries(node.children).forEach(([key, child]) => {
        traverse(child, key)
      })
    } else if (node.type === 'added') {
      result.added.push({ key: parentKey, value: node.value })
    } else if (node.type === 'removed') {
      result.removed.push({ key: parentKey, value: node.value })
    } else if (node.type === 'unchanged') {
      result.unchanged.push({ key: parentKey, value: node.value })
    } else if (node.type === 'changed') {
      result.updated.push({
        key: parentKey,
        from: node.oldValue,
        to: node.newValue,
      })
    }
  }

  Object.entries(ast).forEach(([key, node]) => {
    traverse(node, key)
  })

  return result
}
