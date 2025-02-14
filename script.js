// Select elements
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartBtn = document.querySelector("#restart");
const newGameBtn = document.querySelector("#newGame");
const resultEmoji = document.querySelector("#resultEmoji");

// Game variables
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// Winning combinations
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

// Initialize game
function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    newGameBtn.addEventListener("click", restartGame);
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    running = true;
}

// Handle cell click
function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] !== "" || !running) return;
    
    updateCell(this, cellIndex);
    checkWinner();
}

// Update cell with current player
function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Check if a player won
function checkWinner() {
    let roundWon = false;
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            roundWon = true;
            break;
        }
    }
    
    if (roundWon) {
        statusText.textContent = `${currentPlayer} Wins!`;
        showReaction(currentPlayer);
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Show laughing reaction for the loser
function showReaction(winner) {
    if (winner === "X") {
        resultEmoji.textContent = "😂 O Loses!";
    } else {
        resultEmoji.textContent = "😂 X Loses!";
    }
}

// Restart Game
function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    resultEmoji.textContent = "";
    cells.forEach(cell => (cell.textContent = ""));
    running = true;
}

initializeGame();
