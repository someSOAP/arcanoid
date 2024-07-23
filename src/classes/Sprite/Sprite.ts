import Atlas from "@/classes/Atlas";
import Block from "@/classes/BaseBlock";

import sprites from '@/sprites/sprites.png'

const spriteImg = new Image;
spriteImg.src = sprites;

class Sprite extends Block {
    context: CanvasRenderingContext2D;
    atlas: Atlas;

    constructor(
        context: CanvasRenderingContext2D,
        atlas: Atlas,
        x: number,
        y: number,
        width: number,
        height: number,
    ) {
        super(x, y, width, height)
        this.context = context
        this.atlas = atlas
    }

    updatePosition (x: number, y: number) : void {
        this.x = x;
        this.y = y;

        this.render();
    }


    render() : void{
        const { context, atlas, x, y, width, height } = this;
        context.drawImage(
            spriteImg,
            atlas.x, atlas.y, atlas.width, atlas.height,
            x, y, width, height
        )
    }

}

export default Sprite;
