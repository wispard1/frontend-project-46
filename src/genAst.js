const isObject = value =>
  value && typeof value === 'object' && !Array.isArray(value)

export default function genAst(obj1, obj2) {
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])
  const sortedKeys = [...keys].sort()
  const ast = {}

  for (const key of sortedKeys) {
    const val1 = obj1[key]
    const val2 = obj2[key]

    if (!Object.hasOwn(obj2, key)) {
      ast[key] = { type: 'removed', value: val1 }
    }
    else if (!Object.hasOwn(obj1, key)) {
      ast[key] = { type: 'added', value: val2 }
    }
    else if (isObject(val1) && isObject(val2)) {
      ast[key] = { type: 'nested', children: genAst(val1, val2) }
    }
    else if (val1 !== val2) {
      ast[key] = { type: 'changed', oldValue: val1, newValue: val2 }
    }
    else {
      ast[key] = { type: 'unchanged', value: val1 }
    }
  }

  return ast
}
