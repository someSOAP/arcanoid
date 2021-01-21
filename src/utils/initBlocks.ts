import Block from "../classes/Block";
import getRandom from "./getRandom";
import Atlass from "../classes/Atlass";
import atlass from "../sprites/atlass";

function initBlocks(canvas: HTMLCanvasElement) {
    const blocks : Array<Block> = []

    const blocksPerXAxis = Math.floor(canvas.width / 50) - 2;
    const blocksPerYAxis = Math.floor((canvas.height * 0.5) / 20)
    const padding = Math.floor((canvas.width - blocksPerXAxis * 50) / 2)


    for (let x=0; x<blocksPerXAxis; x++) {
        for (let y=0; y<blocksPerYAxis; y++) {
            const color: string = getRandom(["red", "yellow", "green", "pink"]);
            const blockAtlass : Atlass = atlass.get(color);
            blocks.push(new Block(canvas, blockAtlass, padding + 50 * x, padding + 20 * y, color))
        }
    }

    return blocks;
}

export default initBlocks