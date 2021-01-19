// @ts-ignore
import sprites from './sprites/sprites.png'
// @ts-ignore
import space from './sprites/space.jpg'

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

const image = new Image;
image.src = sprites

const background = new Image;
background.src = space;

const atlass = {
    ball: {
        x: 3,
        y: 587,
        width: 38,
        height: 38,
    },

    platform: {
        x: 108,
        y: 176,
        width: 210,
        height: 18,
    },

    yellow: {
        x: 174,
        y: 36,
        width: 42,
        height: 20,
    },

    red: {
        x: 0,
        y: 36,
        width: 42,
        height: 20,
    },

    green: {
        x: 174,
        y: 0,
        width: 42,
        height: 20,
    },

    pink: {
        x: 116,
        y: 36,
        width: 42,
        height: 20,
    }
}

let ball = {
    x: canvas.width / 2,
    y: canvas.height -50,
    width: 10,
    height: 10,
    speed: 200,
    angle: Math.PI / 4 + Math.random() * Math.PI / 2,

}

let platform = {
    x: canvas.width / 2 - 100,
    y: canvas.height - 30,
    width: 150,
    height: 20,
    speed: 300,
    leftKey: false,
    rightKey: false,
}

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
    { x: 0, y: -10, width: canvas.width, height: 10 },
    { x: canvas.width, y: 0, width: 10, height: canvas.height },
    { x: 0, y: canvas.height, width: canvas.width, height: 10 },
    { x: -10, y: 0, width: 10, height: canvas.height },
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

        ball = {
            x: canvas.width / 2,
            y: canvas.height -50,
            width: 10,
            height: 10,
            speed: 200,
            angle: Math.PI / 4 + Math.random() * Math.PI / 2,

        }

        platform = {
            x: canvas.width / 2 - 100,
            y: canvas.height - 30,
            width: 150,
            height: 20,
            speed: 300,
            leftKey: false,
            rightKey: false,
        }

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


        ball.x += secondPart * ball.speed * Math.cos(ball.angle);
        ball.y -= secondPart * ball.speed * Math.sin(ball.angle);

        if (platform.leftKey) {
            platform.x = Math.max(0, platform.x - secondPart * platform.speed)
        }

        if (platform.rightKey) {
            platform.x = Math.min(canvas.width - platform.width, platform.x + secondPart * platform.speed)
        }

        for(const block of blocks) {
            if(isIntersection(block, ball)){


                const ctrl1 = {
                    x: block.x - 10,
                    y: block.y - 10,
                    width: 10 + block.width,
                    height: 10
                }

                const ctrl2 = {
                    x: block.x - block.width,
                    y: block.y - 10,
                    width: 10,
                    height: 10 + block.height
                }
                const ctrl3 = {
                    x: block.x,
                    y: block.y + block.height,
                    width: block.width + 10,
                    height: 10
                }

                const ctrl4 = {
                    x: block.x - 10,
                    y: block.y,
                    width: 10,
                }

                if(isIntersection(ctrl1, ball) || isIntersection(ctrl3, ball)) {
                    ball.angle = Math.PI * 2 - ball.angle
                } else if(isIntersection(ctrl2, ball) || isIntersection(ctrl4, ball)) {
                    height: block.height + 10
                    ball.angle = Math.PI - ball.angle
                }

                toggleItem(blocks, block)


            }
        }

        if(isIntersection(limits[0], ball) || isIntersection(limits[2], ball)){
            ball.angle = Math.PI * 2 - ball.angle
        }

        if(isIntersection(limits[1], ball) || isIntersection(limits[3], ball)){
            ball.angle = Math.PI - ball.angle
        }

        if(isIntersection(limits[2], ball)){
            playing = false;
        }

        if(isIntersection(platform, ball)) {
            const x = ball.x + ball.width / 2;
            const percent = (x - platform.x) / platform.width;
            ball.angle = Math.PI - Math.PI * 0.8 * (percent +0.05);
        }

    }

    drawBall(ball);

    drawPlatform(platform);


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

function isIntersection (blockA, blockB) {
    const pointsA = [
        {x: blockA.x, y: blockA.y},
        {x: blockA.x + blockA.width, y: blockA.y},
        {x: blockA.x, y: blockA.y + blockA.height},
        {x: blockA.x + blockA.width, y: blockA.y + blockA.height}
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
        if(blockA.x <= pointB.x && pointB.x <= blockA.x + blockA.width && blockA.y <=
            pointB.y && pointB.y <= blockA.y + blockA.height){
            return true;
        }
    }

    return false;

}

function toggleItem (array, item) {
    const indexOfItem = array.indexOf(item);

    if(indexOfItem >=0 ){
        array.splice(indexOfItem, 1);
    } else {
        array.push(item)
    }
}

function drawBall (ball){
    context.drawImage(
        image,
        atlass.ball.x, atlass.ball.y, atlass.ball.width, atlass.ball.height,
        ball.x, ball.y, ball.width, ball.height
    )
}

function drawBlock (block) {
    const { color } = block;
    context.drawImage(
        image,
        atlass[color].x, atlass[color].y, atlass[color].width, atlass[color].height,
        block.x, block.y, block.width, block.height
    )
}

function drawPlatform (platform) {
    context.drawImage(
        image,
        atlass.platform.x, atlass.platform.y, atlass.platform.width, atlass.platform.height,
        platform.x, platform.y, platform.width, platform.height
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