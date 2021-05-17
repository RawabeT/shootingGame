let canvas = document.querySelector("#canvas")
let context = canvas.getContext("2d")

let rightPress = false
let leftPress = false
let enterPress = false
let loss = false
let alive = true
let score = 0
let lives = 3

let player = {
    x: 250, // position
    y: canvas.height - 50, //position
    h: 50,
    w: 50,
    dx: 0,
    dy: 0
};

function drawPlyer() {
    roundRect(player.x, player.y, player.w, player.h, 20, 'white');
}

function roundRect(x, y, w, h, radius, color) // draw rounded rectangle
{
    let r = x + w;
    let b = y + h;
    context.beginPath();
    context.fillStyle = color;
    context.lineWidth = "4";
    context.moveTo(x + radius, y);
    context.lineTo(r - radius, y);
    context.quadraticCurveTo(r, y, r, y + radius);
    context.lineTo(r, y + h - radius);
    context.quadraticCurveTo(r, b, r - radius, b);
    context.lineTo(x + radius, b);
    context.quadraticCurveTo(x, b, x, b - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.fill();
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

    if (score > 49) {
        enemies.splice(0, enemies.length) // stop enemies generate when score is 50
        bigEnemy()
        bigEnemyShooting()
    }

    killBigEnemy()
    killEnemy()
    collision(player, enemy, ...enemies)
    collision(block, enemy, ...enemies)
    enemiesMove()
    drawblock()
    drawPlyer()
    scoreDisplay()
    shooting()
    drawShots()
    drawEnemies()
    requestAnimationFrame(update);
}


function scoreDisplay() {
    context.fillStyle = 'white';
    context.font = '20px Verdana';
    context.fillText("Score : " + score, canvas.width - 580, 20);
    context.fillText("Lives : " + lives, canvas.width - 100, 20);

    if (!alive) { // if player touch enemy game over
        context.clearRect(0, 0, canvas.width, canvas.height);
        enemies.splice(0, enemies.length)
        context.fillText("Your Score : " + score, canvas.width - 350, canvas.height - 200);
        context.fillText('Game Over!', canvas.width - 350, canvas.height / 2);
    }
    if (score > 70) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillText("Your Score : " + score, canvas.width - 350, canvas.height - 200);
        context.fillText('You win ^^', canvas.width - 350, canvas.height / 2);
    }
}

let blocks = [];
let block = {
    total: 2,
    x: 50 + Math.random() * 250,
    y: 50 + Math.random() * 300,
    w: 100,
    h: 50
}

function drawblock() {
    let blockImg = new Image();
    blockImg.src = 'img/wall.png';

    blocks.push(
        context.drawImage(blockImg, block.x, block.y, block.w, block.h))

    blocks.push(
        context.drawImage(blockImg, block.x + 200, block.y - 30, block.w, block.h))

    blocks.push(
        context.drawImage(blockImg, block.x - 200, block.y - 30, block.w, block.h))
}


let shot = 10
let shots = []
function drawShots() { // draw shots
    if (shots.length) {
        for (let index = 0; index < shots.length; index++) {
            context.fillStyle = 'peru'
            roundRect(shots[index][0], shots[index][1], shots[index][2], shots[index][3], shots[index][4]);
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
    let enemyImg = new Image();
    enemyImg.src = 'img/enmy.png';

    if (enemies.length) {
        for (let index = 0; index < enemies.length; index++) {
            context.drawImage(enemyImg, enemies[index][0], enemies[index][1], enemies[index][2], enemies[index][3]);
        }
    }

    for (let index = 0; index < 5; index++) {
        enemies.push([enemy.x, enemy.y, enemy.h, enemy.w, enemy.speed])
        enemy.x += 100
    }
}

function enemiesMove() {
    for (let index = 0; index < enemies.length; index++) {
        if (enemies[index][1] < 600) {
            enemies[index][1] += enemy.speed;
        } else if (enemies[index][1] > 600 - 1) {
            enemies[index][1] = -45;
        }
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
    }
}

function killBigEnemy() {
    let hit = false;
    for (let i = 0; i < shots.length; i++) {
        if (shots[i][1] <= (bigEnm.y + bigEnm.h) && shots[i][0] >= bigEnm.x && shots[i][0] <= (bigEnm.x + bigEnm.w)) {
            hit = true;
            //enemies.push([(Math.random() * 500) + 50, -45, enemy.w, enemy.h, enemy.speed]);
        }
        if (hit == true) {
            shots.splice(i, 1);
            hit = false;
            score += 1
        }
    }
}


let bigEnm = {
    x: 100,
    y: 100,
    h: 100,
    w: 100,
    dx: 2,
    dy: 2
}


function bigEnemy() {
    let bigEnemyImg = new Image();
    bigEnemyImg.src = 'img/theDevil.png';

    context.drawImage(bigEnemyImg, bigEnm.x, bigEnm.y, bigEnm.h, bigEnm.w);

    if (bigEnm.x + bigEnm.dx > canvas.width - 100 || bigEnm.x + bigEnm.dx < 20) {
        bigEnm.dx = - bigEnm.dx;
    }
    if (bigEnm.y + bigEnm.dy > canvas.height - 300 || bigEnm.y + bigEnm.dy < 20) {
        bigEnm.dy = -bigEnm.dy;
    }

    bigEnm.x += bigEnm.dx;
    bigEnm.y += bigEnm.dy;

}


let bigEnmShots = []

function bigEnemyShooting() {

    if (bigEnmShots.length) { // draw big enemy shots
        for (let index = 0; index < bigEnmShots.length; index++) {
            context.fillStyle = 'red';
            context.fillRect(bigEnmShots[index][0], bigEnmShots[index][1], bigEnmShots[index][2], bigEnmShots[index][3]);
        }
    }

    for (let i = 0; i < 5; i++) {
        bigEnmShots.push([bigEnm.x, bigEnm.y, 4, 20]); // shooting start 
    }

    for (let j = 0; j < bigEnmShots.length; j++) {
        if (bigEnmShots[j][1] > 11) {
            bigEnmShots[j][1] += 50;
        } else if (bigEnmShots[j][1] < 10) {
            bigEnmShots.splice(j, 1); // if shooting end first round remove
        }
    }
}

function collision(object1, object2, ...array) {

    let object1XW = object1.x + object1.w,
        object1YH = object1.y + object1.h;

    for (let i = 0; i < array.length; i++) {
        if (object1.x > array[i][0] && object1.x < array[i][0] + object2.w && object1.y > array[i][1] && object1.y < array[i][1] + object2.y) {
            Lives()
        }
        if (object1XW < array[i][0] + object2.w && object1XW > array[i][0] && object1.y > array[i][1] && object1.y < array[i][1] + object2.y) {
            Lives()
        }
        if (object1YH > array[i][1] && object1YH < array[i][1] + object2.y && object1.x > array[i][0] && object1.x < array[i][0] + object2.w) {
            Lives()
        }
        if (object1YH > array[i][1] && object1YH < array[i][1] + object2.y && object1XW < array[i][0] + object2.w && object1XW > array[i][0]) {
            Lives()
        }
    }
}


function Lives() {
    lives -= 1;
    if (lives > 0) {
        let enemy_reset_x = 50;
        player.x = (canvas.width / 2) - 25, player.y = canvas.height - 75, player.w = 50, player.h = 57;
        for (let i = 0; i < enemies.length; i++) {
            enemies[i][0] = enemy_reset_x;
            enemies[i][1] = -45;
            enemy_reset_x += 100
        }
    } else if (lives == 0) {
        alive = false;
    }
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
            shots.push([player.x + 25, player.y - 20, 4, 20, 20]); // shooting start
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