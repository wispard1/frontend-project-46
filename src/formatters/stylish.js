const stylish = (obj1, obj2, depth = 0) => {
  const keys = [
    ...new Set([...Object.keys(obj1), ...Object.keys(obj2)]),
  ].sort((a, b) => a.localeCompare(b))

  const space = 4
  const indent = ' '.repeat(depth * space)
  const changeIndent = ' '.repeat(depth * space + 2)
  const sameIndent = ' '.repeat(depth * space + 4)

  const formatValue = (value, currentDepth) => {
    if (value === null) return 'null'
    if (value === '') return ''

    if (typeof value === 'object' && value !== null) {
      const nestedKeys = Object.keys(value)
      if (nestedKeys.length === 0) return '{}'

      const nestedDiff = nestedKeys.map((key) => {
        const nestedValue = formatValue(value[key], currentDepth + 1)

        return `${' '.repeat(
          (currentDepth + 1) * space + 4,
        )}${key}: ${nestedValue}`
      })
      return `{\n${nestedDiff.join('\n')}\n${' '.repeat(
        (currentDepth + 1) * space,
      )}}`
    }
    return String(value)
  }

  const diff = keys.flatMap((key) => {
    const value1 = obj1[key]
    const value2 = obj2[key]

    if (
      typeof value1 === 'object' &&
      value1 !== null &&
      typeof value2 === 'object' &&
      value2 !== null
    ) {
      const nestedDiff = stylish(value1, value2, depth + 1)

      return `${sameIndent}${key}: ${nestedDiff}`
    }

    if (
      typeof value1 === 'object' &&
      value1 !== null &&
      typeof value2 !== 'object' &&
      value2 !== undefined
    ) {
      const nestedDiff = formatValue(value1, depth)

      return [
        //
        `${changeIndent}- ${key}: ${nestedDiff}`,
        `${changeIndent}+ ${key}: ${formatValue(value2, depth)}`,
      ]
    }

    if (
      typeof value2 === 'object' &&
      value2 !== null &&
      typeof value1 !== 'object' &&
      value1 !== undefined
    ) {
      const nestedDiff = formatValue(value2, depth)

      return [
        //
        `${changeIndent}- ${key}: ${formatValue(value1, depth)}`,
        `${changeIndent}+ ${key}: ${nestedDiff}`,
      ]
    }

    if (!Object.hasOwn(obj2, key) && value1 !== undefined) {
      return `${changeIndent}- ${key}: ${formatValue(value1, depth)}`
    }
    if (!Object.hasOwn(obj1, key) && value2 !== undefined) {
      return `${changeIndent}+ ${key}: ${formatValue(value2, depth)}`
    }
    if (value1 !== value2) {
      const lines = []
      if (value1 !== undefined) {
        lines.push(`${changeIndent}- ${key}: ${formatValue(value1, depth)}`)
      }
      if (value2 !== undefined) {
        lines.push(`${changeIndent}+ ${key}: ${formatValue(value2, depth)}`)
      }
      return lines
    }
    return `${sameIndent}${key}: ${formatValue(value1, depth)}`
  })

  return `{\n${diff.join('\n')}\n${indent}}`
}

export default stylish
