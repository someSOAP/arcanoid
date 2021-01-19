import CanvasObjectInterface from "../../interfaces/CanvasObjectInterface";

class BaseBlock implements CanvasObjectInterface{
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    isIntersectedBy (blockB: BaseBlock) {
        const pointsA = [
            {x: this.x, y: this.y},
            {x: this.x + this.width, y: this.y},
            {x: this.x, y: this.y + this.height},
            {x: this.x + this.width, y: this.y + this.height}
        ]

        for (const pointA of pointsA) {
            if(blockB.x <= pointA.x && pointA.x <= blockB.x + blockB.width && blockB.y <=
                pointA.y && pointA.y <= blockB.y + blockB.height){
                return true;
            }
        }

        const pointsB = [
            {x: blockB.x, y: blockB.y},
            {x: blockB.x + blockB.width, y: blockB.y},
            {x: blockB.x, y: blockB.y + blockB.height},
            {x: blockB.x + blockB.width, y: blockB.y + blockB.height}
        ]

        for (const pointB of pointsB) {
            if(this.x <= pointB.x && pointB.x <= this.x + this.width && this.y <=
                pointB.y && pointB.y <= this.y + this.height){
                return true;
            }
        }

        return false;

    }
}

export default BaseBlock;