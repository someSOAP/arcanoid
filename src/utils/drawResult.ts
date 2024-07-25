function drawResult(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Canvas 2D context is null')
  }

  context.beginPath()
  context.rect(0, 0, canvas.width, canvas.height)
  context.fillStyle = 'rgba(255, 255, 255, 0.7)'
  context.fill()

  context.fillStyle = '#03175c'
  context.font = 'bold 48px sans-serif'
  context.textAlign = 'center'
  context.fillText('ARCANOID', canvas.width / 2, canvas.height / 2)

  const isMobile = window.matchMedia('(pointer: coarse)').matches

  context.fillStyle = '#414d75'
  context.font = '24px sans-serif'
  context.textAlign = 'center'
  context.fillText(
    isMobile ? 'Tap to continue' : 'Press any key to continue',
    canvas.width / 2,
    canvas.height / 2 + 48,
  )
}

export default drawResult
