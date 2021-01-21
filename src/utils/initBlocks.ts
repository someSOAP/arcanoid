import Block from "@/classes/Block";
import { blockAtlas } from "../sprites/atlas";
import getRandom from "./getRandom";
import { BlockColor } from "@/classes/Block";

function initBlocks(canvas: HTMLCanvasElement): Array<Block> {
    const blocks : Array<Block> = []

    const blockWidth = 50;
    const blockHeight = 20;

    const blocksPerXAxis = Math.floor(canvas.width / blockWidth) - 2;
    const blocksPerYAxis = Math.floor((canvas.height * 0.5) / blockHeight)
    const padding = Math.floor((canvas.width - blocksPerXAxis * blockWidth) / 2)


    for (let x=0; x<blocksPerXAxis; x++) {
        for (let y=0; y<blocksPerYAxis; y++) {
            const color: BlockColor = getRandom(["red", "yellow", "green", "pink"]);


            blocks.push(
                new Block(
                    canvas,
                    blockAtlas[color],
                    padding + blockWidth * x,
                    padding + blockHeight * y,
                    blockWidth,
                    blockHeight,
                    color
                ))
        }
    }

    return blocks;
}

export default initBlocks