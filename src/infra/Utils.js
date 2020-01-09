export function isFunction (value) {
  return (
    value &&
    (Object.prototype.toString.call(value) === '[object Function]' ||
      typeof value === 'function' ||
      value instanceof Function)
  )
}

export function required (attributeName) {
  throw Error(`${attributeName} is a required parameter`)
}

export function stripHtmlFromText (text) {
  return text.replace(
    /(<\?[a-z]*(\s[^>]*)?\?(>|$)|<!\[[a-z]*\[|\]\]>|<!DOCTYPE[^>]*?(>|$)|<!--[\s\S]*?(-->|$)|<[a-z?!/]([a-z0-9_:.])*(\s[^>]*)?(>|$))/gi,
    ''
  )
}

export function truncateText (source, size = 100) {
  return source.length > size ? source.slice(0, size - 1) + '...' : source
}

export function useItIfDefinedOtherwise (value, defaultValue) {
  if (value) return value
  else return defaultValue
}
