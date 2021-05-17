let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

let rightPress = false;
let leftPress = false;
let enterPress = false;
let loss = false
let alive = true
let score = 0;
let collisionB = true;

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

}
// function playerTouch() {
//     for (let i = 0; i < enemies.length; i++) {
//         if (player && collision(player, enemies[i])) {
//             loss = true;
//             alert("You lossssss :(")
//         }
//     }
// }

// function collision(element1,element2) {
//     if (
//       (
//         element1.x > element2.x + element2.width &&
//         element1.x + element1.width < element2.x &&
//         element1.y > element2.y + element2.height &&
//         element1.y + element1.height < element2.y
//       )
//     ) {
//       return true
//     }
//   }

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
    //playerTouch()
    collision()
    enemiesMove()
    collisionBlock()
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

    if (score > 49) {
        enemies.splice(0, enemies.length) // stop enemies generate when score is 50
    }

    if (alive == false) { // if player touch enemy game over
        context.clearRect(0, 0, canvas.width, canvas.height);
        enemies.splice(0, enemies.length)
        context.fillText('Game Over!', canvas.width - 350, canvas.height / 2);
    }
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

    for (let i = 0; i < enemies.length; i++) {
        if (!collisionB)
            enemies[i].splice(i,1);
    }
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

function bigHero() {

}

function collision() {

    let playerXW = player.x + player.w,
        playerYH = player.y + player.h;

    for (let i = 0; i < enemies.length; i++) {
        if (player.x > enemies[i][0] && player.x < enemies[i][0] + enemy.w && player.y > enemies[i][1] && player.y < enemies[i][1] + enemy.y) {
            alive = false;
        }
        if (playerXW < enemies[i][0] + enemy.w && playerXW > enemies[i][0] && player.y > enemies[i][1] && player.y < enemies[i][1] + enemy.y) {
            alive = false;
        }
        if (playerYH > enemies[i][1] && playerYH < enemies[i][1] + enemy.y && player.x > enemies[i][0] && player.x < enemies[i][0] + enemy.w) {
            alive = false;
        }
        if (playerYH > enemies[i][1] && playerYH < enemies[i][1] + enemy.y && playerXW < enemies[i][0] + enemy.w && playerXW > enemies[i][0]) {
            alive = false;
        }
    }
}

function collisionBlock() { //block & enmy

    let blockXW = block.x + block.w,
        blockYH = block.y + block.h;

    for (let i = 0; i < enemies.length; i++) {
        if (block.x > enemies[i][0] && block.x < enemies[i][0] + enemy.w && block.y > enemies[i][1] && block.y < enemies[i][1] + enemy.y) {
            collisionB = false;
        }
        if (blockXW < enemies[i][0] + enemy.w && blockXW > enemies[i][0] && block.y > enemies[i][1] && block.y < enemies[i][1] + enemy.y) {
            collisionB = false;
        }
        if (blockYH > enemies[i][1] && blockYH < enemies[i][1] + enemy.y && block.x > enemies[i][0] && block.x < enemies[i][0] + enemy.w) {
            collisionB = false;
        }
        if (blockYH > enemies[i][1] && blockYH < enemies[i][1] + enemy.y && blockXW < enemies[i][0] + enemy.w && blockXW > enemies[i][0]) {
            collisionB = false;
        }
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