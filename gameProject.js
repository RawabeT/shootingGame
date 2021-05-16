let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

let rightPress = false;
let leftPress = false;
let enterPress = false;
let loss = false
let score = 0;

let player = {
    x: 250, // position
    y: canvas.height - 50, //position
    h: 50,
    w: 50,
    dx: 0,
    dy: 0
};

function drawPlyer() {
    context.fillStyle = 'blue';
    context.fillRect(player.x, player.y, player.w, player.h);

    for (let i = 0; i < enemies.length; i++) {
        if ((player.x > enemies[i].x + enemies[i].w || player.x + player.w < enemies[i].x || player.y > enemies[i].y + enemies[i].h || player.y + player.h < enemies[i].y)){
            loss = true;
        }
    }

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

    killEnemy()
    enemiesMove()
    drawblock()
    drawPlyer()
    scoreDisplay()
    bigHero()
    shooting()
    drawShots()
    drawEnemies()
    requestAnimationFrame(update);
}


function scoreDisplay() {
    context.fillStyle = 'blue';
    context.font = '20px Verdana';
    context.fillText("Score : " + score, 20, 20);
}

let blocks = [];
let block = {
    total: 2,
    x: 50 + Math.random() * 250,
    y: 50 + Math.random() * 300
    // w: 100,
    // h: 50
}

function drawblock() {
    blocks.push(context.fillStyle = 'red',
        context.fillRect(block.x, block.y, 100, 50))

    blocks.push(context.fillStyle = 'red',
        context.fillRect(block.x + 200, block.y - 30, 100, 50))
}

let shot = 10
let shots = []
function drawShots() { // draw shots
    if (shots.length) {
        for (let index = 0; index < shots.length; index++) {
            context.fillStyle = 'green'
            context.fillRect(shots[index][0], shots[index][1], shots[index][2], shots[index][3]);
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

let enemies = []
let enemy = {
    x: 50,
    y: 50,
    h: 50,
    w: 50,
    speed: 2
}

function drawEnemies() { // draw enemies
    if (enemies.length) {
        for (let index = 0; index < enemies.length; index++) {
            context.fillStyle = 'orange'
            context.fillRect(enemies[index][0], enemies[index][1], enemies[index][2], enemies[index][3]);
        }
    }

    for (let index = 0; index < 5; index++) {
        enemies.push([enemy.x, enemy.y, enemy.h, enemy.w, enemy.speed])
        enemy.x += 100
    }
}

function enemiesMove() {
    for (let index = 0; index < enemies.length; index++) {
        enemies[index][1] += enemy.speed;
    }
}

function killEnemy() {
    let remove = false;
    for (let i = 0; i < shots.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if (shots[i][1] <= (enemies[j][1] + enemies[j][3]) && shots[i][0] >= enemies[j][0] && shots[i][0] <= (enemies[j][0] + enemies[j][2])) {
                remove = true;
                enemies.splice(j, 1);
                enemies.push([(Math.random() * 500) + 50, -45, enemy.w, enemy.h, enemy.speed]);
            }
        }
        if (remove == true) {
            shots.splice(i, 1);
            remove = false;
            score += 1
        }
        if (score > 50) {

        }
    }

}

function bigHero() {

}

document.addEventListener('keydown', (e) => {

    if (e.key === "ArrowRight" || e.key === "Right") {

        //player Right move
        rightPress = true
    }
    else if (e.key === "ArrowLeft" || e.key === "Left") {

        //player left move
        leftPress = true
    }
    else if (e.key === "Enter" && shots.length <= shot) {
        enterPress = true
        if (enterPress && shots.length <= shot) {
            shots.push([player.x + 25, player.y - 20, 4, 20]); // shooting start
        }
    }
})

document.addEventListener('keyup', (e) => {

    if (e.key === "ArrowRight" || e.key === "Right") {

        //player Right move
        rightPress = false
    }
    else if (e.key === "ArrowLeft" || e.key === "Left") {

        //player left move
        leftPress = false
    }
})

update()