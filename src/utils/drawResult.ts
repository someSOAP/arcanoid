function drawResult (canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('2d')

    if(!context) {
        throw new Error('Canvas 2D context is null')
    }

    context.beginPath()
    context.rect(0, 0, canvas.width, canvas.height)
    context.fillStyle = "rgba(255, 255, 255, 0.5)"
    context.fill()

    context.fillStyle = "black"
    context.font = "30px Tahoma"
    context.textAlign = "center"
    context.fillText("Конец игры", canvas.width / 2, canvas.height / 2);

    context.fillStyle = "black"
    context.font = "12px Tahoma"
    context.textAlign = "center"
    context.fillText("Для продолжения нажмите Enter", canvas.width / 2, canvas.height / 2 + 20);
}

export default drawResult;
