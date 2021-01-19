import Sprite from "../Sprite";
import Atlass from "../Atlass";

class Block extends Sprite{
    color:  string

    constructor(
        canvas: HTMLCanvasElement,
        atlass: Atlass,
        x: number,
        y: number,
        color: string
    ) {
        const context: CanvasRenderingContext2D = canvas.getContext('2d');
        super(context, atlass, x, y, 50, 20);
        this.color = color;
    }

}

export default Block;