const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;


const ball = {
    x: canvas.width / 2,
    y: canvas.height -50,
    width: 10,
    height: 10,
    speed: 200,
    angle: Math.PI / 4 + Math.random() * Math.PI / 2,

}

const platform = {
    x: 10,
    y: canvas.height - 30,
    width: 200,
    height: 20,
    speed: 200,
    leftKey: false,
    rightKey: false,
}

const blocks = [
    {
        x: 50,
        y: 50,
        width: 50,
        height: 20,
    }, {
        x: 100,
        y: 50,
        width: 50,
        height: 20,
    }, {
        x: 150,
        y: 50,
        width: 50,
        height: 20,
    }, {
        x: 200,
        y: 50,
        width: 50,
        height: 20,
    }
]

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
function loop(timestamp){
    requestAnimationFrame(loop)

    const dTimestamp = timestamp - pTimestamp;
    const secondPart = dTimestamp / 1000;
    pTimestamp = timestamp;

    clearCanvas();

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
                height: block.height + 10
            }

            if(isIntersection(ctrl1, ball) || isIntersection(ctrl3, ball)) {
                ball.angle = Math.PI * 2 - ball.angle
            } else if(isIntersection(ctrl2, ball) || isIntersection(ctrl4, ball)) {
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

    if(isIntersection(platform, ball)) {
        ball.angle = Math.PI * 2 - ball.angle;
    }

    drawRect(ball);

    drawRect(platform);

    for (const block of blocks) {
        drawRect(block)
    }

}

// drawRect(ball)
// drawRect(platform)


function drawRect (param) {
    context.beginPath();
    context.rect(param.x, param.y, param.width, param.height);
    context.strokeStyle = 'red';
    context.stroke();

}

function clearCanvas () {
    canvas.width |= 0;
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