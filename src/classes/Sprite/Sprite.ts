import Atlass from "../Atlass";
// @ts-ignore
import sprites from '../../sprites/sprites.png'
import CanvasObjectInterface from "../../interfaces/CanvasObjectInterface";

const spriteImg = new Image;
spriteImg.src = sprites;

class Sprite implements CanvasObjectInterface {
    context: CanvasRenderingContext2D;
    atlass: Atlass;
    x: number;
    y: number;
    width: number;
    height: number;


    constructor(context: CanvasRenderingContext2D, atlass: Atlass) {
        this.context = context
        this.atlass = atlass
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