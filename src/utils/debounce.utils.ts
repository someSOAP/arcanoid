export const debounce = <T extends (...args: any[]) => void>(
  callback: T,
  wait: number,
) => {
  let timeoutId: any = null
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback(...args)
    }, wait)
  }
}
