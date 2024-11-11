export function formatKey(key) {
  if (typeof key !== 'string') {
    console.log(key)
    return key // or return an empty string or any other default behavior
  }

  // Split camelCase words using a regular expression
  const formatted = key.replace(/([a-z])([A-Z])/g, '$1 $2')

  // Capitalize the first letter of each word
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}
