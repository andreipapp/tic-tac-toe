const Gameboard = (function () {
    let rows = 3;
    let columns = 3;
    let board = [];
    function createBoard() {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = '';
            }
        }
        return board;
    }
    createBoard();
    const displayBoard = () => board;
    const resetBoard = function () {
        board = createBoard();
    }
    const updateBoard = (mark, rowIndex, columnIndex) => {
        if (board[rowIndex][columnIndex] === '') {
            board[rowIndex][columnIndex] = mark;
        }

    }
    return { displayBoard, resetBoard, updateBoard };
})();

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
}
const gameController = (function () {
    let players = [];
    let currentPlayerIndex = 0;
    let gameEnded = false;
    const winner = document.querySelector('.winner');

    const buttons = document.querySelector('.buttons');
    const container = document.querySelector('.container');

    const startGame = function (playerOneName = 'playerOne', playerTwoName = 'playerTwo') {
        players = [Player(playerOneName, 'X'), Player(playerTwoName, 'O')]
        Gameboard.resetBoard();
        displayController.render();
        gameEnded = false;
        winner.textContent = '';

    }
    const playRound = function (rowIndex, columnIndex) {
        if (gameEnded) return;
        const currentPlayer = players[currentPlayerIndex];
        const selectedCell = Gameboard.displayBoard()[rowIndex][columnIndex];
        if (selectedCell !== '') {
            return;
        }
        Gameboard.updateBoard(currentPlayer.getMark(), rowIndex, columnIndex);
        Gameboard.displayBoard();
        if (checkWin(currentPlayer.getMark())) {
            winner.textContent = currentPlayer.getName() + ' wins!!';
            gameEnded = true;
        }
        else if (checkDraw()) {
            winner.textContent = 'Draw!!';

            gameEnded = true;
        }
        else {
            switchPlayer();
        }
    };
    const switchPlayer = function () {
        currentPlayerIndex = currentPlayerIndex === 1 ? 0 : 1;
    };
    const checkWin = function (mark) {
        const board = Gameboard.displayBoard();
        let i = 0;
        let j = 2;
        for (let i = 0; i < 3; i++) {
            if ((board[i][0] === mark && board[i][1] === mark && board[i][2] === mark) ||
                (board[0][i] === mark && board[1][i] === mark && board[2][i] === mark)) {
                return true;
            }
        }
        if ((board[0][0] === mark && board[1][1] === mark && board[2][2] === mark) ||
            (board[0][2] === mark && board[1][1] === mark && board[2][0] === mark)) {
            return true;
        }
        return false;

    };
    const checkDraw = function () {
        const emptyBoard = function () {
            const board = Gameboard.displayBoard();

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === '') {
                        return true;
                    }
                }
            }
            return false;

        }
        if (!emptyBoard() && !checkWin()) {
            return true;
        }

    };
    const resetGame = function () {
        currentPlayerIndex = 0;
        Gameboard.resetBoard();
        winner.textContent = '';

    };
    return { startGame, playRound, resetGame };
})();
const displayController = (function () {
    const render = (function () {
        const board = Gameboard.displayBoard();
        const cells = document.querySelectorAll('.cell');
        let i = 0; let j = 0;
        cells.forEach((cell) => {
            cell.textContent = board[i][j];
            j++;
            if (j === 3) {
                i++;
                j = 0;
            }
        })

    })
    return { render };
})();

const startButton = document.querySelector('.start');
const restartButton = document.querySelector('.restart');
const cells = document.querySelectorAll('.cell');
const addPlayers = document.querySelector('.addPlayers');
let playerOneName = 'Player One';
let playerTwoName = 'Player Two';
gameController.startGame(playerOneName, playerTwoName);

addPlayers.addEventListener('click', () => {
    const input1 = document.querySelector('.input-one');
    const input2 = document.querySelector('.input-two');
    const playerOneName = input1.value;
    const playerTwoName = input2.value;

    gameController.startGame(playerOneName, playerTwoName);
    input1.value = '';
    input2.value = '';
})
startButton.addEventListener('click', () => {

    gameController.startGame(playerOneName = 'playerOne', playerTwoName = 'playerTwo');
    displayController.render();

})

restartButton.addEventListener('click', () => {

    Gameboard.resetBoard();
    gameController.startGame(playerOneName = 'playerOne', playerTwoName = 'playerTwo');
    displayController.render();
})

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        const rowIndex = Math.floor(index / 3);
        const columnIndex = index % 3;
        gameController.playRound(rowIndex, columnIndex);
        displayController.render();

    })
})




