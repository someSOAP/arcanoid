import space from '@/sprites/space.jpg'

const background = new Image()
background.src = space

function clearCanvas(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Canvas has no 2D context')
  }

  context.drawImage(background, 0, 0, canvas.width, canvas.height)
}

export default clearCanvas
