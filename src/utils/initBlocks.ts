import Block from '@/classes/Block'

import { getRandomBlockColor } from '@/utils/color.utils.ts'

function initBlocks(canvas: HTMLCanvasElement): Array<Block> {
  const blocks: Array<Block> = []

  const blockWidth = 50
  const blockHeight = 20

  const blocksPerXAxis = Math.floor(canvas.width / blockWidth) - 2
  const blocksPerYAxis = Math.floor((canvas.height * 0.5) / blockHeight)
  const padding = Math.floor((canvas.width - blocksPerXAxis * blockWidth) / 2)

  for (let x = 0; x < blocksPerXAxis; x++) {
    for (let y = 0; y < blocksPerYAxis; y++) {
      const color = getRandomBlockColor()

      blocks.push(
        new Block(canvas, {
          x: padding + blockWidth * x,
          y: padding + blockHeight * y,
          width: blockWidth,
          height: blockHeight,
          color,
        }),
      )
    }
  }

  return blocks
}

export default initBlocks
