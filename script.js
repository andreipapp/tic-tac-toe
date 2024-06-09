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
    const startGame = function (playerOneName, playerTwoName) {
        players = [Player(playerOneName, 'X'), Player(playerTwoName, 'O')]
        Gameboard.resetBoard();
    }
    const playRound = function (rowIndex, columnIndex) {
        const currentPlayer = players[currentPlayerIndex];
        Gameboard.updateBoard(currentPlayer.getMark(), rowIndex, columnIndex);
        Gameboard.displayBoard();
        if (checkWin(currentPlayer.getMark())) {
            console.log(`${currentPlayer.getName()} wins!`)
        }
        else if (checkDraw()) {
            console.log('It is a draw!')
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
    };
    return { startGame, playRound, resetGame };
})();

console.log(Gameboard.displayBoard());
gameController.startGame('jimmy', 'maria');
gameController.playRound(0, 1);
gameController.playRound(0, 2);
gameController.playRound(1, 1);
gameController.playRound(1, 2);
gameController.playRound(2, 2);
gameController.playRound(2, 1);
gameController.playRound(1, 0);
gameController.playRound(0, 0);
gameController.playRound(2, 0);
