import Sprite from "../Sprite";
import Atlass from "../Atlass";

class Platform extends Sprite {

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

        this.speed = 300;
        this.leftKey = false;
        this.rightKey = false;
    }
}

export default Platform;