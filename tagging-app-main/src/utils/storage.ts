export function setStorage(space: string, value: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(space, value)
  }
}
export function getStorage(space: string) {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(space) ?? ''
  }
}
