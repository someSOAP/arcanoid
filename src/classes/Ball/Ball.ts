import Sprite from "../Sprite";
import Atlass from "../Atlass";

class Ball extends Sprite {
    speed: number;
    angle: number;

    constructor(
        canvas: HTMLCanvasElement,
        atlass: Atlass,
        x: number,
        y: number,
    ) {
        const context: CanvasRenderingContext2D = canvas.getContext('2d');

        super(context, atlass, x, y, 10, 10);
        this.x = x;
        this.y = y;
        this.speed = 200;
        this.angle = Math.PI / 4 + Math.random() * Math.PI / 2;
    }

}

export default Ball;