export const toggleItem = <T>(array: Array<T>, item: T) => {
  const indexOfItem = array.indexOf(item)

  if (indexOfItem >= 0) {
    array.splice(indexOfItem, 1)
  } else {
    array.push(item)
  }
}
