import Ball from "./classes/Ball";
import BaseBlock from "./classes/BaseBlock";
import Platform from "./classes/Platform";
import Block from "./classes/Block";
import drawResult from "./utils/drawResult";
import clearCanvas from "./utils/clearCanvas";
import toggleItem from "./utils/toggleItem";
import initBlocks from "./utils/initBlocks";
import atlass from "./sprites/atlass";

function arkanoid(canvas: HTMLCanvasElement){

    let ball: Ball = new Ball(canvas, atlass.get("ball"), canvas.width / 2, canvas.height -50)
    let platform: Platform = new Platform(canvas, atlass.get("platform"), canvas.width / 2 - 100, canvas.height - 30)
    let blocks: Array<Block> = initBlocks(canvas);

    const limits: Map<String, BaseBlock> = new Map()
    limits.set("up",    new BaseBlock(0, -10, canvas.width, 10))
    limits.set("right", new BaseBlock(canvas.width, 0, 10, canvas.height))
    limits.set("down",  new BaseBlock(0, canvas.height, canvas.width, 10))
    limits.set("left",  new BaseBlock(-10, 0, 10, canvas.height))

    document.onkeydown = (event) => {
        if(event.key === 'ArrowLeft') {
            platform.leftKey = true
        }
        if(event.key === 'ArrowRight') {
            platform.rightKey = true
        }
        if(event.key === 'Enter' && !playing) {
            playing  = true
            ball     = new Ball(canvas, atlass.get("ball"), canvas.width / 2, canvas.height -50)
            platform = new Platform(canvas, atlass.get("platform"), canvas.width / 2 - 100, canvas.height - 30)
            blocks   = initBlocks(canvas)
        }
    }

    document.onkeyup = (event) => {
        if(event.key === 'ArrowLeft') {
            platform.leftKey = false;
        }
        if(event.key === 'ArrowRight') {
            platform.rightKey = false;
        }
    }

    let pTimestamp = 0;
    let playing = false;

    void function loop(timestamp){
        requestAnimationFrame(loop)

        clearCanvas(canvas);

        if(playing){

            const dTimestamp : number = Math.min(16.7, timestamp - pTimestamp);
            const secondPart : number = dTimestamp / 1000;
            pTimestamp = timestamp;

            ball.updatePosition(secondPart);

            if (platform.leftKey) {
                platform.moveLeft(secondPart)
            }

            if (platform.rightKey) {
                platform.moveRight(secondPart)
            }

            for(const block of blocks) {
                if(block.checkIfIntersectedByBall(ball)){
                    toggleItem(blocks, block)
                }
            }

            if(ball.isIntersectedWith(limits.get("up")) || ball.isIntersectedWith(limits.get("down"))) {
                ball.horizontalHit()
            }

            if(ball.isIntersectedWith(limits.get("right")) || ball.isIntersectedWith(limits.get("left"))) {
                ball.verticalHit()
            }

            if(ball.isIntersectedWith(limits.get("down"))) {
                playing = false;
            }

            platform.checkIfIntersectedWithBall(ball)

        }

        platform.render();

        for (const block of blocks) {
            block.render()
        }

        if(!playing){
            drawResult(canvas)
        }
    }()

}

export default arkanoid;