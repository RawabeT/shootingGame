let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

let rightPress = false;
let leftPress = false;
let enterPress = false;
let count = 0;

let player = {
    x: 250, // position
    y: canvas.height - 50, //position
    h: 50,
    w: 50,
    dx: 0,
    dy: 0
};

function drawPlyer() {
    context.beginPath();
    context.rect(player.x, player.y, player.w, player.h);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
}


function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (rightPress) {
        player.x += 10;
        if (player.x + player.w > canvas.width) {
            player.x = canvas.width - player.w;
        }
    }
    else if (leftPress) {
        player.x -= 10;
        if (player.x < 0) {
            player.x = 0;
        }
    }

    drawPlyer()
    score()
    shooting()
    drawShots()
    requestAnimationFrame(update);
}

function score() {
    context.fillStyle = 'blue';
    context.font = '20px Verdana';
    context.fillText("Score : " + count, 20, 20);
}

function blocks() {
    let block = [];
    let blk;

    for (let index = 0; index < 2; index++) {
        blk = document.createElement('div')
        blk.style.width = "50px";
        blk.style.height = "50px";
        blk.style.backgroundColor = "black";

        console.log(blk);
        block[index] = blk;
    }

}

let shot = 2
let shots = []
function drawShots() { // draw shots
    if (shots.length) {
        for (let index = 0; index < shots.length; index++) {
            context.fillStyle = 'green'
            context.fillRect(shots[index][0], shots[index][1], shots[index][2], shots[index][3]);
            console.log("sh")
        }
    }
}

function shooting() {
    for (let index = 0; index < shots.length; index++) {
        if (shots[index][1] > -11) {
            shots[index][1] -= 10;
        } else if (shots[index][1] < -10) {
            shots.splice(index, 1); // if shooting end first round remove
        }
    }
}

document.addEventListener('keydown', (e) => {

    if (e.key === "ArrowRight" || e.key === "Right") {

        //player Right move
        rightPress = true
        //console.log("r")
    }
    else if (e.key === "ArrowLeft" || e.key === "Left") {

        //player left move
        leftPress = true
       // console.log("l")
    }
    else if (e.key === "Enter" && shots.length <= shot) {
        enterPress = true
        if (enterPress && shots.length <= shot) {
            shots.push([player.x + 25, player.y - 20, 4, 20]); // shooting start
            console.log("shots pushed")
        }
    }
})

document.addEventListener('keyup', (e) => {

    if (e.key === "ArrowRight" || e.key === "Right") {

        //player Right move
        rightPress = false
       // console.log("r")
    }
    else if (e.key === "ArrowLeft" || e.key === "Left") {

        //player left move
        leftPress = false
        //console.log("l")
    }
})
blocks()
update()
