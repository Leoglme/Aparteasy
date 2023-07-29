/* Function to loop through the field object and retrieve a value with path */
export function getValueWithPath<T>(item: T, path: string) {
  let value: any = item
  const keys = path.split('.')
  for (const key of keys) {
    if (!value) {
      value = {}
    }
    value = value[key]
  }
  return value?.toString()
}
