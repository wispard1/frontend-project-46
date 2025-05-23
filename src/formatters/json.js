const json = (obj1, obj2) => {
  const diff = {
    added: [],
    removed: [],
    updated: [],
    unchanged: [],
  }

  const buildDiff = (obj1, obj2, prefix = '') => {
    const keys = [
      ...new Set([...Object.keys(obj1), ...Object.keys(obj2)]),
    ].sort((a, b) => a.localeCompare(b))

    keys.forEach((key) => {
      const value1 = obj1 ? obj1[key] : undefined
      const value2 = obj2 ? obj2[key] : undefined
      const fullKey = prefix ? `${prefix}.${key}` : key

      if (!Object.hasOwn(obj2, key) && 
        value1 !== undefined) {
        diff.removed.push({ key, value: value1 })
      } else if (!Object.hasOwn(obj1, key) 
        && value2 !== undefined) {
        diff.added.push({ key, value: value2 })
      } else if (
        typeof value1 === 'object' &&
        typeof value2 === 'object' &&
        value1 !== null &&
        value2 !== null
      ) {
        buildDiff(value1, value2, fullKey)
      } else if (value1 !== value2) {
        diff.updated.push({ key, from: value1, to: value2 })
      } else {
        diff.unchanged.push({ key, value: value2 })
      }
    })
  }

  buildDiff(obj1, obj2)
  return JSON.stringify(diff, null, 2)
}

export default json
