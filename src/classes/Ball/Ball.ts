import Sprite from "../Sprite";
import { ball as ballAtlas } from '../../sprites/atlas'

class Ball extends Sprite {
    speed: number;
    angle: number;

    constructor(
        canvas: HTMLCanvasElement,
        x: number,
        y: number,
    ) {
        const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

        super(context, ballAtlas, x, y, 10, 10);
        this.x = x;
        this.y = y;
        this.speed = 200;
        this.angle = Math.PI / 4 + Math.random() * Math.PI / 2;
    }

    updatePosition(dTime: number): void {
        const { x, y, speed, angle } = this;

        super.updatePosition(
            x + dTime * speed * Math.cos(angle),
            y - dTime * speed * Math.sin(angle)
        );
    }

    horizontalHit(): void {
        this.angle = Math.PI * 2 - this.angle
    }

    verticalHit(): void {
        this.angle = Math.PI - this.angle
    }

}

export default Ball;