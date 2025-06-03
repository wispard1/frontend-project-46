const isObject = value =>
  value && typeof value === 'object' && !Array.isArray(value)

export default function genAst(obj1, obj2) {
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])
  const sortedKeys = [...keys].sort()

  return Object.fromEntries(
    sortedKeys.map((key) => {
      const val1 = obj1[key]
      const val2 = obj2[key]

      if (!Object.hasOwn(obj2, key)) {
        return [key, { type: 'removed', value: val1 }]
      }
      if (!Object.hasOwn(obj1, key)) {
        return [key, { type: 'added', value: val2 }]
      }
      if (isObject(val1) && isObject(val2)) {
        return [key, { type: 'nested', children: genAst(val1, val2) }]
      }
      if (val1 !== val2) {
        return [key, { type: 'changed', oldValue: val1, newValue: val2 }]
      }

      return [key, { type: 'unchanged', value: val1 }]
    }),
  )
}
