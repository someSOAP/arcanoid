function toggleItem(array: Array<any>, item: any): void {
  const indexOfItem = array.indexOf(item)

  if (indexOfItem >= 0) {
    array.splice(indexOfItem, 1)
  } else {
    array.push(item)
  }
}

export default toggleItem
