import getRandom from '@/utils/getRandom.ts'

export const ColorMap = new Map([
  ['red', '#d60025'],
  ['pink', '#cf3d60'],
  ['yellow', '#ffad2c'],
  ['green', '#00a51f'],
  ['blue', '#006aaa'],
  ['dark', '#03175c'],
])

export const getRandomBlockColor = () => {
  return getRandom(Array.from(ColorMap.values()))
}
