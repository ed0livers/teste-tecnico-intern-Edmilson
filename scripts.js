const rows = 30;
const cols = 45;
const board = Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.random() > 0.5 ? 1 : 0));
const boardElement = document.getElementById('board');

function createBoard() {
    boardElement.innerHTML = board.map(row => `<br>${row.map(cell => `<div class="cell" style="background-color:${cell ? '#000' : '#fff'}"></div>`).join('')}`).join('');
}

function update() {
    const newBoard = [];
    for (let i = 0; i < rows; i++) {
        const newRow = [];
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j);
            if (board[i][j] === 1) {
                newRow.push(neighbors === 2 || neighbors === 3 ? 1 : 0);
            } else {
                newRow.push(neighbors === 3 ? 1 : 0);
            }
        }
        newBoard.push(newRow);
    }
    board.splice(0, board.length, ...newBoard);
    createBoard();
}

function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const nx = x + i;
            const ny = y + j;
            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
                count += board[nx][ny];
            }
        }
    }
    return count;
}

setInterval(update, 100);