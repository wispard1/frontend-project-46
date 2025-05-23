const plain = (obj1, obj2, ancestors = []) => {
  const isComplexValue = (value) => typeof value === 'object' && value !== null

  const formatValue = (value) => {
    if (isComplexValue(value)) {
      return '[complex value]'
    }

    if (typeof value === 'string') {
      return `'${value}'`
    }

    return String(value)
  }

  const buildPath = (key, ancestors) => {
    return [...ancestors, key].join('.')
  }

  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort(
    (a, b) => a.localeCompare(b)
  )

  const lines = keys.flatMap((key) => {
    const value1 = obj1[key]
    const value2 = obj2[key]
    const path = buildPath(key, ancestors)

    if (
      typeof value1 === 'object'
      && value1 !== null
      && typeof value2 === 'object'
      && value2 !== null
    ) {
      return plain(
        value1,
        value2,
        [...ancestors, key].filter((line) => line !== '')
      )
    }

    if (!Object.hasOwn(obj2, key) && value1 !== undefined) {
      return `Property '${path}' was removed`
    }

    if (!Object.hasOwn(obj1, key) && value2 !== undefined) {
      return `Property '${path}' was added with value: ${formatValue(value2)}`
    }

    if (value1 !== value2) {
      return `Property '${path}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`
    }

    return ''
  })

  return lines.filter((line) => line !== '').join('\n')
}

export default plain