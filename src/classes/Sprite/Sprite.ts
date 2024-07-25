import Block from '@/classes/BaseBlock'
import { CanvasObject } from '@/types'

interface SpriteInnerProps {
  color: string
  borderRadius?: number
}

export interface SpriteProps extends CanvasObject, SpriteInnerProps {}

export class Sprite extends Block implements SpriteInnerProps {
  context: CanvasRenderingContext2D
  color: string
  borderRadius?: number

  constructor(
    context: CanvasRenderingContext2D,
    { x, y, width, height, color, borderRadius }: SpriteProps,
  ) {
    super(x, y, width, height)
    this.context = context
    this.color = color
    this.borderRadius = borderRadius
  }

  updatePosition(x: number, y: number): void {
    this.x = x
    this.y = y

    this.render()
  }

  render(): void {
    const { context, color, x, y, width, height, borderRadius } = this

    context.beginPath()
    context.fillStyle = color
    context.roundRect(x, y, width, height, borderRadius)
    context.fill()

    context.globalAlpha = 0.15

    const padding = Math.min(width * 0.1, height * 0.2)

    context.beginPath()
    context.fillStyle = 'white'
    context.roundRect(
      x + padding,
      y + padding,
      width - 2 * padding,
      height - 2 * padding,
      borderRadius,
    )
    context.fill()
    context.globalAlpha = 1
  }
}

export default Sprite
