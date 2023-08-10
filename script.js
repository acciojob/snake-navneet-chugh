//your code here
const gameContainer = document.getElementById("gameContainer");
let snake = [{ row: 20, col: 1 }];
let direction = "right";
let food = null;
let score = 0;

function createPixel(row, col, className) {
    const pixel = document.createElement("div");
    pixel.id = `pixel${row}-${col}`;
    pixel.classList.add(className);
    pixel.style.gridColumn = col;
    pixel.style.gridRow = row;
    gameContainer.appendChild(pixel);
}

function createFood() {
    const row = Math.floor(Math.random() * 40) + 1;
    const col = Math.floor(Math.random() * 40) + 1;
    food = { row, col };
    createPixel(row, col, "food");
}

function updateGame() {
    const head = { ...snake[0] };
    
    if (direction === "right") head.col++;
    if (direction === "left") head.col--;
    if (direction === "down") head.row++;
    if (direction === "up") head.row--;

    if (head.row === food.row && head.col === food.col) {
        snake.unshift(head);
        createFood();
        score++;
        updateScore();
    } else {
        const tail = snake.pop();
        document.getElementById(`pixel${tail.row}-${tail.col}`).remove();
        snake.unshift(head);
    }

    if (head.row < 1 || head.row > 40 || head.col < 1 || head.col > 40) {
        clearInterval(gameInterval);
        alert("Game Over!");
    }

    snake.forEach(segment => {
        createPixel(segment.row, segment.col, "snakeBodyPixel");
    });
}

function updateScore() {
    const scoreBoard = document.getElementById("scoreBoard");
    scoreBoard.textContent = `Score: ${score}`;
}

createFood();
updateScore();
const gameInterval = setInterval(updateGame, 100);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "down") direction = "up";
    if (event.key === "ArrowDown" && direction !== "up") direction = "down";
    if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (event.key === "ArrowRight" && direction !== "left") direction = "right";
});
