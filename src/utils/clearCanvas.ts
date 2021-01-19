import space from "../sprites/space.jpg";

const background = new Image;
background.src = space;

function clearCanvas (canvas: HTMLCanvasElement): void {

    const context: CanvasRenderingContext2D = canvas.getContext('2d')
    context.drawImage(background, 0, 0, canvas.width, canvas.height)
}

export default clearCanvas