import Atlass from "./classes/Atlass";
import Ball from "./classes/Ball";
import BaseBlock from "./classes/BaseBlock";
import Platform from "./classes/Platform";
import Block from "./classes/Block";
import drawResult from "./utils/drawResult";
import clearCanvas from "./utils/clearCanvas";
import getRandom from "./utils/getRandom";
import toggleItem from "./utils/toggleItem";

void function arkanoid(){
    const canvas = document.querySelector('canvas');

    canvas.width = 500;
    canvas.height = 500;

    const atlass: Map<string, Atlass> = new Map()
    atlass.set("ball",     new Atlass(3,  587,38, 38))
    atlass.set("platform", new Atlass(108,176,210,18))
    atlass.set("yellow",   new Atlass(174,36, 42, 20))
    atlass.set("red",      new Atlass(0,  36, 42, 20))
    atlass.set("green",    new Atlass(174,0,  42, 20))
    atlass.set("pink",     new Atlass(116,36, 42, 20))

    let ball: Ball = new Ball(canvas, atlass.get("ball"), canvas.width / 2, canvas.height -50)
    let platform: Platform = new Platform(canvas, atlass.get("platform"), canvas.width / 2 - 100, canvas.height - 30)
    let blocks: Array<Block> = initBlocks();

    const limits: Map<String, BaseBlock> = new Map()
    limits.set("up",    new BaseBlock(0, -10, canvas.width, 10))
    limits.set("right", new BaseBlock(canvas.width, 0, 10, canvas.height))
    limits.set("down",  new BaseBlock(0, canvas.height, canvas.width, 10))
    limits.set("left",  new BaseBlock(-10, 0, 10, canvas.height))

    document.addEventListener('keydown', (event) => {
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
            blocks   = initBlocks()
        }
    })

    document.addEventListener('keyup', (event) => {
        if(event.key === 'ArrowLeft') {
            platform.leftKey = false;
        }
        if(event.key === 'ArrowRight') {
            platform.rightKey = false;
        }
    })

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

    function initBlocks(){
        const blocks : Array<Block> = []

        for (let x=0; x<8; x++) {
            for (let y=0; y<10; y++) {
                const color: string = getRandom(["red", "yellow", "green", "pink"]);
                const blockAtlass : Atlass = atlass.get(color);
                blocks.push(new Block(canvas, blockAtlass, 50 + 50 * x, 50 + 20 * y, color))
            }
        }

        return blocks;
    }

}()
