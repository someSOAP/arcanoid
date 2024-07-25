import Block from '@/classes/BaseBlock'

class Sprite extends Block {
  context: CanvasRenderingContext2D
  color: string

  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ) {
    super(x, y, width, height)
    this.context = context
    this.color = color
  }

  updatePosition(x: number, y: number): void {
    this.x = x
    this.y = y

    this.render()
  }

  render(): void {
    const { context, color, x, y, width, height } = this

    context.fillStyle = color
    context.fillRect(x, y, width, height)

    context.globalAlpha = 0.15

    context.fillStyle = 'white'
    context.fillRect(
      x + width * 0.1,
      y + height * 0.2,
      width * 0.8,
      height * 0.6,
    )

    context.globalAlpha = 1

    // context.drawImage(
    //   spriteImg,
    //   atlas.x,
    //   atlas.y,
    //   atlas.width,
    //   atlas.height,
    //   x,
    //   y,
    //   width,
    //   height,
    // )
  }
}

export default Sprite
