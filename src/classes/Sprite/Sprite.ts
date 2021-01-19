import Atlass from "../Atlass";
// @ts-ignore
import sprites from '../../sprites/sprites.png'
import Block from "../BaseBlock";

const spriteImg = new Image;
spriteImg.src = sprites;

class Sprite extends Block {
    context: CanvasRenderingContext2D;
    atlass: Atlass;

    constructor(
        context: CanvasRenderingContext2D,
        atlass: Atlass,
        x: number,
        y: number,
        width: number,
        height: number,
    ) {
        super(x, y, width, height)
        this.context = context
        this.atlass = atlass
    }

    updatePosition(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.render();
    }


    render(){
        const { context, atlass, x, y, width, height } = this;
        context.drawImage(
            spriteImg,
            atlass.x, atlass.y, atlass.width, atlass.height,
            x, y, width, height
        )
    }

}

export default Sprite;