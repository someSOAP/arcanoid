import Ball from "@/classes/Ball";
import BaseBlock from "@/classes/BaseBlock";
import Platform from "@/classes/Platform";
import Block from "@/classes/Block";
import drawResult from "@/utils/drawResult";
import clearCanvas from "@/utils/clearCanvas";
import toggleItem from "@/utils/toggleItem";
import initBlocks from "@/utils/initBlocks";
import { GameParams } from "@/types"
import Limits from "@/classes/Limits";

const arkanoid = (canvas: HTMLCanvasElement, gameParams: GameParams) => {

    let slowDownCf: number = 1000
    let ball: Ball = new Ball(canvas, canvas.width / 2, canvas.height -50)
    let platform: Platform = new Platform(canvas, canvas.width / 2 - 100, canvas.height - 30)
    let blocks: Array<Block> = initBlocks(canvas);

    const limits: Limits = new Limits(
        new BaseBlock(0, -10, canvas.width, 10),
        new BaseBlock(canvas.width, 0, 10, canvas.height),
        new BaseBlock(0, canvas.height, canvas.width, 10),
        new BaseBlock(-10, 0, 10, canvas.height)
    )

    document.addEventListener('keydown', (event) => {
        if(event.key === 'ArrowUp') {
            slowDownCf = 200
        }
        if(event.key === 'ArrowLeft') {
            platform.leftKey = true
        }
        if(event.key === 'ArrowRight') {
            platform.rightKey = true
        }
        if(event.key === 'Enter' && !playing) {
            playing  = true
            ball     = new Ball(canvas, canvas.width / 2, canvas.height -50)
            platform = new Platform(canvas, canvas.width / 2 - 100, canvas.height - 30)
            blocks   = initBlocks(canvas)
        }
    })


    document.addEventListener('keyup', (event) => {
        if(event.key === 'ArrowUp') {
            slowDownCf = 1000
        }
        if(event.key === 'ArrowLeft') {
            platform.leftKey = false;
        }
        if(event.key === 'ArrowRight') {
            platform.rightKey = false;
        }
    })

    let pTimestamp: number = 0;
    let playing: boolean = false;

    const gameId: string = gameParams.id;

    void function loop(timestamp: number){
        if(gameId !== gameParams.id){
            return void 0;
        }

        requestAnimationFrame(loop)

        clearCanvas(canvas);

        if(playing){

            const dTimestamp : number = Math.min(16.7, timestamp - pTimestamp);
            const secondPart : number = dTimestamp / slowDownCf;
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

            if(ball.isIntersectedWith(limits.up)) {
                ball.horizontalHit()
            }

            if(ball.isIntersectedWith(limits.right) || ball.isIntersectedWith(limits.left)) {
                ball.verticalHit()
            }

            if(ball.isIntersectedWith(limits.down)) {
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

    }(pTimestamp)

}

export default arkanoid;
