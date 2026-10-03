
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement =
    document.getElementById("score");

const highScoreElement =
    document.getElementById("highScore");

const finalScoreElement =
    document.getElementById("finalScore");

const startScreen =
    document.getElementById("startScreen");

const gameOverScreen =
    document.getElementById("gameOverScreen");

const startButton =
    document.getElementById("startButton");

const restartButton =
    document.getElementById("restartButton");


/* =========================================
   CONFIGURACIÓN
========================================= */

const groundY = 420;

let gameRunning = false;

let score = 0;

let highScore =
    Number(localStorage.getItem("cyberRunHighScore")) || 0;

let speed = 6;

let obstacleTimer = 0;

let animationId;


/* =========================================
   JUGADOR
========================================= */

const player = {

    x: 100,

    y: groundY - 70,

    width: 45,

    height: 70,

    velocityY: 0,

    jumpPower: -16,

    gravity: 0.8,

    grounded: true

};


/* =========================================
   OBSTÁCULOS
========================================= */

let obstacles = [];


/* =========================================
   INICIAR JUEGO
========================================= */

function startGame() {

    gameRunning = true;

    score = 0;

    speed = 6;

    obstacles = [];

    obstacleTimer = 0;

    player.y =
        groundY - player.height;

    player.velocityY = 0;

    player.grounded = true;

    scoreElement.textContent = "0";

    startScreen.classList.add("hidden");

    gameOverScreen.classList.add("hidden");

    gameLoop();
}


/* =========================================
   SALTAR
========================================= */

function jump() {

    if (!gameRunning) {
        return;
    }

    if (player.grounded) {

        player.velocityY =
            player.jumpPower;

        player.grounded = false;

    }
}


/* =========================================
   CREAR OBSTÁCULO
========================================= */

function createObstacle() {

    const height =
        35 + Math.random() * 45;

    const width =
        25 + Math.random() * 20;

    obstacles.push({

        x: canvas.width + 20,

        y: groundY - height,

        width: width,

        height: height

    });

}


/* =========================================
   ACTUALIZAR JUGADOR
========================================= */

function updatePlayer() {

    player.velocityY +=
        player.gravity;

    player.y +=
        player.velocityY;


    if (
        player.y + player.height >=
        groundY
    ) {

        player.y =
            groundY - player.height;

        player.velocityY = 0;

        player.grounded = true;

    }

}


/* =========================================
   ACTUALIZAR OBSTÁCULOS
========================================= */

function updateObstacles() {

    obstacleTimer--;

    if (obstacleTimer <= 0) {

        createObstacle();

        obstacleTimer =
            80 + Math.random() * 80;

    }


    obstacles.forEach(obstacle => {

        obstacle.x -= speed;

    });


    obstacles =
        obstacles.filter(
            obstacle =>
                obstacle.x + obstacle.width > 0
        );

}


/* =========================================
   COLISIONES
========================================= */

function checkCollision() {

    for (const obstacle of obstacles) {

        const collision =

            player.x <
                obstacle.x + obstacle.width &&

            player.x + player.width >
                obstacle.x &&

            player.y <
                obstacle.y + obstacle.height &&

            player.y + player.height >
                obstacle.y;


        if (collision) {

            endGame();

            return;

        }

    }

}


/* =========================================
   PUNTUACIÓN
========================================= */

function updateScore() {

    score += 0.1;

    const currentScore =
        Math.floor(score);

    scoreElement.textContent =
        currentScore;


    if (currentScore > highScore) {

        highScore =
            currentScore;

        highScoreElement.textContent =
            highScore;

        localStorage.setItem(
            "cyberRunHighScore",
            highScore
        );

    }


    /*
       Cada cierto número de puntos
       aumentamos la velocidad.
    */

    speed =
        6 + Math.floor(currentScore / 100);

}


/* =========================================
   DIBUJAR FONDO
========================================= */

function drawBackground() {

    /*
       Fondo
    */

    ctx.fillStyle = "#080812";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /*
       Líneas verticales
    */

    ctx.strokeStyle =
        "rgba(124,60,255,0.10)";

    ctx.lineWidth = 1;


    for (
        let x = 0;
        x < canvas.width;
        x += 50
    ) {

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(x, groundY);

        ctx.stroke();

    }


    /*
       Líneas horizontales
    */

    for (
        let y = 50;
        y < groundY;
        y += 50
    ) {

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(canvas.width, y);

        ctx.stroke();

    }


    /*
       Luna / planeta
    */

    const gradient =
        ctx.createRadialGradient(
            700,
            100,
            20,
            700,
            100,
            180
        );

    gradient.addColorStop(
        0,
        "rgba(255,43,214,0.25)"
    );

    gradient.addColorStop(
        1,
        "rgba(255,43,214,0)"
    );

    ctx.fillStyle = gradient;

    ctx.beginPath();

    ctx.arc(
        700,
        100,
        180,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /*
       Suelo
    */

    ctx.fillStyle = "#11111e";

    ctx.fillRect(
        0,
        groundY,
        canvas.width,
        canvas.height - groundY
    );


    /*
       Línea del suelo
    */

    ctx.strokeStyle = "#ff2bd6";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(
        0,
        groundY
    );

    ctx.lineTo(
        canvas.width,
        groundY
    );

    ctx.stroke();


    /*
       Líneas del suelo
    */

    ctx.strokeStyle =
        "rgba(124,60,255,0.4)";

    for (
        let x = -100;
        x < canvas.width + 100;
        x += 80
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            groundY
        );

        ctx.lineTo(
            x + 40,
            canvas.height
        );

        ctx.stroke();

    }

}


/* =========================================
   DIBUJAR JUGADOR
========================================= */

function drawPlayer() {

    /*
       Glow
    */

    ctx.shadowColor =
        "#ff2bd6";

    ctx.shadowBlur = 20;


    /*
       Cuerpo
    */

    ctx.fillStyle = "#7c3cff";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );


    /*
       Cabeza
    */

    ctx.fillStyle = "#ff2bd6";

    ctx.fillRect(
        player.x + 5,
        player.y - 20,
        player.width - 10,
        20
    );


    /*
       Visor
    */

    ctx.fillStyle = "#080812";

    ctx.fillRect(
        player.x + 10,
        player.y - 14,
        player.width - 20,
        7
    );


    /*
       Pequeño núcleo
    */

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
        player.x + 18,
        player.y + 25,
        9,
        9
    );


    ctx.shadowBlur = 0;

}


/* =========================================
   DIBUJAR OBSTÁCULOS
========================================= */

function drawObstacles() {

    obstacles.forEach(obstacle => {

        ctx.shadowColor =
            "#ff2b5f";

        ctx.shadowBlur = 15;

        ctx.fillStyle = "#ff2b5f";


        /*
           Cuerpo
        */

        ctx.fillRect(
            obstacle.x,
            obstacle.y,
            obstacle.width,
            obstacle.height
        );


        /*
           Parte superior
        */

        ctx.fillStyle = "#ff72a0";

        ctx.fillRect(
            obstacle.x - 5,
            obstacle.y,
            obstacle.width + 10,
            6
        );


        ctx.shadowBlur = 0;

    });

}


/* =========================================
   DIBUJAR TODO
========================================= */

function draw() {

    drawBackground();

    drawObstacles();

    drawPlayer();

}


/* =========================================
   FINALIZAR PARTIDA
========================================= */

function endGame() {

    gameRunning = false;

    cancelAnimationFrame(animationId);

    finalScoreElement.textContent =
        Math.floor(score);

    gameOverScreen.classList.remove(
        "hidden"
    );

}


/* =========================================
   GAME LOOP
========================================= */

function gameLoop() {

    if (!gameRunning) {
        return;
    }


    updatePlayer();

    updateObstacles();

    checkCollision();

    updateScore();

    draw();


    animationId =
        requestAnimationFrame(gameLoop);

}


/* =========================================
   CONTROLES
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.code === "Space" ||
            event.code === "ArrowUp"
        ) {

            event.preventDefault();

            jump();

        }

    }
);


/* =========================================
   CONTROL CON MOUSE
========================================= */

canvas.addEventListener(
    "click",
    () => {

        jump();

    }
);


/* =========================================
   BOTONES
========================================= */

startButton.addEventListener(
    "click",
    startGame
);

restartButton.addEventListener(
    "click",
    startGame
);


/* =========================================
   MOSTRAR RÉCORD
========================================= */

highScoreElement.textContent =
    highScore;


/* =========================================
   DIBUJO INICIAL
========================================= */

draw();

