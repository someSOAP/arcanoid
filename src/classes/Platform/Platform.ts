import Sprite from "../Sprite";
import Atlass from "../Atlass";
import Ball from "../Ball";

class Platform extends Sprite {
    canvas: HTMLCanvasElement;
    speed: number;
    leftKey: boolean;
    rightKey: boolean;

    constructor (
        canvas: HTMLCanvasElement,
        atlass: Atlass,
        x: number,
        y: number,
    ) {
        const context: CanvasRenderingContext2D = canvas.getContext('2d');
        super(context, atlass, x, y, 150, 20);

        this.canvas = canvas;
        this.speed = 300;
        this.leftKey = false;
        this.rightKey = false;
    }

    moveLeft(dTime): void {
        const { x, speed } = this;
        this.x = Math.max(0, x - dTime * speed)
    }

    moveRight(dTime): void {
        const { canvas, width, x, speed } = this;
        this.x = Math.min(canvas.width - width, x + dTime * speed)
    }

    checkIfIntersectedWithBall (ball: Ball): void {
        if(ball.isIntersectedWith(this)) {
            const x = ball.x + ball.width / 2;
            const percent = (x - this.x) / this.width;
            ball.angle = Math.PI - Math.PI * 0.8 * (percent +0.05);
        }
    }
}

export default Platform;