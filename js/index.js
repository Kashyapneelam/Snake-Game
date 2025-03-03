// Game constatnts & variable
let uSpeed = prompt("Choose your snake speed on which speed you want to play the game");

let inputDir = {x: 0, y:0};
let hiScore = localStorage.getItem("hiscore");

const foodSound = new Audio("EatFood.mp3");
const gameOverSound = new Audio("gameoverSound.mp3");
const moveSound = new Audio("moveSound.mp3");
const musicSound = new Audio("musicSound.mp3");
const board = document.querySelector("#board");
const scorePara = document.querySelector("#score");
const hiScorePara = document.querySelector("#hiScore");

let score = 0;
let speed = uSpeed;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];
let food = {x: 6, y: 7};

// game fnx
const main = (ctime) => {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

const isCollide = (snake) => {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

const gameEngine = () => {
    // part 1: updating the snakeArr array
    if(isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y:0};
        alert("game over. press enter key to play again");
        snakeArr = [
            {x: 13, y: 15}
        ];
        musicSound.play();
        score = 0;
        scorePara.innerText = "Score: "+0;
        uSpeed = prompt("Chose your snake speed on which speed you want to play the game");
        speed = uSpeed;
    }
    //if you have eaten the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        score += 1;
        if (score >= hiscoreVal) {
            localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
            hiScorePara.innerHTML = "High Score: " + score;
        }
        scorePara.innerText = "Score: " + score;
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())
        }
    }

    // move the snakeArr
    for (let i = snakeArr.length - 2; i>=0; i--) {
        snakeArr[i + 1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // p-2: display the snakeArr and food
    // display the snakeArr
    board.innerText = "";
    snakeArr.forEach((e, i) => {
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (i === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    })

    // display the Food
    let foodElement = document.createElement("div");
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add("food");
        board.appendChild(foodElement);
}






// game logic

if (hiScore === null) {
    hiscoreVal = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
} else {
    hiScore.innerHTML = "High Score: " + hiScore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    musicSound.play()
    inputDir = {x: 0, y: 1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;       
            break;
    
        default:
            break;
    }
})