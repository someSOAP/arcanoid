import Sprite from "@/classes/Sprite";
import Atlas from "@/classes/Atlas";
import Ball from "@/classes/Ball";
import BaseBlock from "@/classes/BaseBlock";

export type BlockColor = "red" | "yellow" | "green" | "pink";

class Block extends Sprite {
    color:  string

    constructor(
        canvas: HTMLCanvasElement,
        atlas: Atlas,
        x: number,
        y: number,
        width: number,
        height: number,
        color: BlockColor
    ) {
        const context = canvas.getContext('2d');

        if(!context) {
            throw new Error('Canvas 2D context is null')
        }

        super(context, atlas, x, y, width, height);
        this.color = color;
    }

    checkIfIntersectedByBall(ball: Ball): boolean {
        if(this.isIntersectedWith(ball)){
            const { x, y, width, height } = this;

            const ctrlUp = new BaseBlock(x - 10, y - 10, 10 + width, 10)

            const ctrlRight = new BaseBlock(x - width, y - 10, 10, 10 + height)

            const ctrlDown = new BaseBlock(x,y + height,width + 10,10)

            const ctrlLeft = new BaseBlock(x - 10, y, 10, height + 10)

            if(ball.isIntersectedWith(ctrlUp) || ball.isIntersectedWith(ctrlDown)) {
                ball.horizontalHit()
            }
            if(ball.isIntersectedWith(ctrlRight) || ball.isIntersectedWith(ctrlLeft)) {
                ball.verticalHit()
            }

            return true
        }
        return false
    }
}

export default Block;
