function getRandom (array: Array<any>): any {
    const index = Math.floor(Math.random() * array.length)
    return array[index];
}

export default getRandom