export function removeNullUndefinedProperties<T extends object>(obj: T): T {
  const cleanedObj = { ...obj }

  Object.keys(cleanedObj).forEach((key) => {
    const value = cleanedObj[key as keyof T]

    if (value instanceof Date) {
      return
    }

    if (Array.isArray(value)) {
      cleanedObj[key as keyof T] = value
        .map((item) => {
          return item && typeof item === 'object'
            ? removeNullUndefinedProperties(item)
            : item
        })
        .filter((item) => item !== null && item !== undefined) as typeof value
    } else if (value && typeof value === 'object') {
      cleanedObj[key as keyof T] = removeNullUndefinedProperties(value)
    } else if (value === null || value === undefined) {
      delete cleanedObj[key as keyof T]
    }
  })

  return cleanedObj
}
