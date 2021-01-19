// @ts-ignore
import sprites from './sprites/sprites.png'
// @ts-ignore
import space from './sprites/space.jpg'
import Atlass from "./classes/Atlass";
import Ball from "./classes/Ball";
import BaseBlock from "./classes/BaseBlock";
import Platform from "./classes/Platform";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

const image = new Image;
image.src = sprites

const background = new Image;
background.src = space;

const atlass = {
    ball: new Atlass(3,587, 38, 38),

    platform: new Atlass(108,176,210, 18),

    yellow: new Atlass(174, 36, 42,20),

    red: new Atlass(0, 36,42, 20),

    green: new Atlass(174, 0, 42,20),

    pink: new Atlass(116, 36, 42, 20)

}

let ball = new Ball(canvas, atlass.ball, canvas.width / 2, canvas.height -50)

let platform = new Platform(canvas, atlass.platform, canvas.width / 2 - 100, canvas.height - 30)

let blocks = []


for (let x=0; x<8; x++) {
    for (let y=0; y<10; y++) {
        blocks.push({
            x: 50 + 50 * x,
            y: 50 + 20 * y,
            width: 50,
            height: 20,
            color: getRandom(["red", "yellow", "green", "pink"])
        })
    }
}

const limits = [
    new BaseBlock(0, -10, canvas.width, 10),
    new BaseBlock(canvas.width, 0, 10, canvas.height),
    new BaseBlock(0, canvas.height, canvas.width, 10),
    new BaseBlock(-10, 0, 10, canvas.height),
]

document.addEventListener('keydown', (event) => {
    if(event.key === 'ArrowLeft') {
        platform.leftKey = true;
    }
    if(event.key === 'ArrowRight') {
        platform.rightKey = true;
    }
    if(event.key === 'Enter' && !playing) {
        playing = true

        ball = new Ball(canvas, atlass.ball, canvas.width / 2, canvas.height -50)

        platform = new Platform(canvas, atlass.platform, canvas.width / 2 - 100, canvas.height - 30)

        blocks = []


        for (let x=0; x<8; x++) {
            for (let y=0; y<10; y++) {
                blocks.push({
                    x: 50 + 50 * x,
                    y: 50 + 20 * y,
                    width: 50,
                    height: 20,
                    color: getRandom(["red", "yellow", "green", "pink"])
                })
            }
        }

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

requestAnimationFrame(loop)

let pTimestamp = 0;
let playing = false;
function loop(timestamp){
    requestAnimationFrame(loop)

    clearCanvas();

    if(playing){

        const dTimestamp = Math.min(16.7, timestamp - pTimestamp);
        const secondPart = dTimestamp / 1000;
        pTimestamp = timestamp;

        ball.updatePosition(
            ball.x + secondPart * ball.speed * Math.cos(ball.angle),
            ball.y - secondPart * ball.speed * Math.sin(ball.angle)
        );

        if (platform.leftKey) {
            platform.x = Math.max(0, platform.x - secondPart * platform.speed)
        }

        if (platform.rightKey) {
            platform.x = Math.min(canvas.width - platform.width, platform.x + secondPart * platform.speed)
        }

        for(const block of blocks) {
            if(ball.isIntersectedBy(block)){


                const ctrl1 = new BaseBlock(block.x - 10, block.y - 10, 10 + block.width, 10)

                const ctrl2 = new BaseBlock(block.x - block.width, block.y - 10, 10, 10 + block.height)

                const ctrl3 = new BaseBlock(block.x,block.y + block.height,block.width + 10,10)

                const ctrl4 = new BaseBlock(block.x - 10, block.y, 10, block.height + 10)

                if(ball.isIntersectedBy(ctrl1) || ball.isIntersectedBy(ctrl3)) {
                    ball.angle = Math.PI * 2 - ball.angle
                }
                if(ball.isIntersectedBy(ctrl2) || ball.isIntersectedBy(ctrl4)) {
                    ball.angle = Math.PI - ball.angle
                }

                toggleItem(blocks, block)


            }
        }

        if(ball.isIntersectedBy(limits[0]) || ball.isIntersectedBy(limits[2])){
            ball.angle = Math.PI * 2 - ball.angle
        }

        if(ball.isIntersectedBy(limits[1]) || ball.isIntersectedBy(limits[3])){
            ball.angle = Math.PI - ball.angle
        }

        if(ball.isIntersectedBy(limits[2])){
            playing = false;
        }

        if(ball.isIntersectedBy(platform)) {
            const x = ball.x + ball.width / 2;
            const percent = (x - platform.x) / platform.width;
            ball.angle = Math.PI - Math.PI * 0.8 * (percent +0.05);
        }

    }

    // drawBall(ball);

    // ball.render()

    platform.render();


    for (const block of blocks) {
        drawBlock(block)
    }

    if(!playing){
        drawResult()
    }
}

function clearCanvas () {
    context.drawImage(background, 0, 0, canvas.width, canvas.height)
}

function toggleItem (array, item) {
    const indexOfItem = array.indexOf(item);

    if(indexOfItem >=0 ){
        array.splice(indexOfItem, 1);
    } else {
        array.push(item)
    }
}


function drawBlock (block) {
    const { color } = block;
    context.drawImage(
        image,
        atlass[color].x, atlass[color].y, atlass[color].width, atlass[color].height,
        block.x, block.y, block.width, block.height
    )
}


function getRandom (array) {
    const index = Math.floor(Math.random() * array.length)
    return array[index];
}

function drawResult () {
    context.beginPath()
    context.rect(0, 0, canvas.width, canvas.height)
    context.fillStyle = "rgba(255, 255, 255, 0.5)"
    context.fill()

    context.fillStyle = "black"
    context.font = "30px Tahoma"
    context.textAlign = "center"
    context.fillText("Конец игры", canvas.width / 2, canvas.height / 2);

    context.fillStyle = "black"
    context.font = "12px Tahoma"
    context.textAlign = "center"
    context.fillText("Для продолжения нажмите Enter", canvas.width / 2, canvas.height / 2 + 20);
}