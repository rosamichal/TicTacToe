const $moveX = 'board--move-x';
const $moveO = 'board--move-o';
const $markXClass = 'board__cell--x';
const $markOClass = 'board__cell--o';
const $gameResult = {
    XWIN: 'xWin',
    OWIN: 'oWin',
    DRAW: 'draw'
}

let $boardCells;
let $board;
let $winningMessage;
let $winningMessageText;
let $winningMessageButton;

let $currentMove = $moveX;
let $moveCounter = 0;
const $boardSize = 3;

const main = () => {
    prepareDOMElements();
    newGame();
}

const prepareDOMElements = () => {
    $board = document.querySelector('.board--js');
    $boardCells = document.querySelectorAll('.board__cell--js');
    $winningMessage = document.querySelector('.winning-message--js');
    $winningMessageText = document.querySelector('.winning-message__text--js');
    $winningMessageButton = document.querySelector('.winning-message__button--js');

    $winningMessageButton.addEventListener('click', newGame);
}

const newGame = () => {
    reset();
}

const reset = () => {
    $boardCells.forEach(cell => {
        cell.classList.remove($markOClass);
        cell.classList.remove($markXClass);

        cell.addEventListener('click', markCell, {
            once: true
        });
    });
    $winningMessage.classList.remove('winning-message--win-o');
    $winningMessage.classList.remove('winning-message--win-x');
    $winningMessage.classList.remove('winning-message--draw');
    $winningMessage.classList.add('hide');

    $moveCounter = 0;
    $board.classList.add($currentMove);
}

const markCell = (event) => {
    $moveCounter++;
    putMark(event.target);
    checkWin();
    checkDraw();
    switchTurn();
}

const putMark = cell => {
    const className = $currentMove === $moveO ? $markOClass : $markXClass;
    cell.classList.add(className);
}

const checkWin = () => {
    let xCells = [];
    let oCells = [];
    let emptyCells = [];
    debugger;
    // check rows
    for (let i = 0; i < $boardSize; i++) {
        xCells = [];
        oCells = [];
        emptyCells = [];
        for (let j = 0; j < $boardSize; j++) {
            let cellIndex = i * $boardSize + j;
            if ($boardCells[cellIndex].classList.contains($markXClass)) {
                xCells.push(cellIndex);
            } else if ($boardCells[cellIndex].classList.contains($markOClass)) {
                oCells.push(cellIndex);
            } else {
                emptyCells.push(cellIndex);
            }
        }

        if (xCells.length === $boardSize) {
            showWinningMessage($gameResult.XWIN);
        } else if (oCells.length === $boardSize) {
            showWinningMessage($gameResult.OWIN);
        }
    }

    // columns
    for (let i = 0; i < $boardSize; i++) {
        xCells = [];
        oCells = [];
        emptyCells = [];
        for (let j = 0; j < $boardSize; j++) {
            let cellIndex = i + j * $boardSize;
            if ($boardCells[cellIndex].classList.contains($markXClass)) {
                xCells.push(cellIndex);
            } else if ($boardCells[cellIndex].classList.contains($markOClass)) {
                oCells.push(cellIndex);
            } else {
                emptyCells.push(cellIndex);
            }
        }

        if (xCells.length === $boardSize) {
            showWinningMessage($gameResult.XWIN);
        } else if (oCells.length === $boardSize) {
            showWinningMessage($gameResult.OWIN);
        }
    }

    // diagonals
    xCells = [];
    oCells = [];
    emptyCells = [];
    for (let i = 0; i < $boardSize; i++) {
        let cellIndex = i + i * $boardSize;
        if ($boardCells[cellIndex].classList.contains($markXClass)) {
            xCells.push(cellIndex);
        } else if ($boardCells[cellIndex].classList.contains($markOClass)) {
            oCells.push(cellIndex);
        } else {
            emptyCells.push(cellIndex);
        }
    }

    if (xCells.length === $boardSize) {
        showWinningMessage($gameResult.XWIN);
    } else if (oCells.length === $boardSize) {
        showWinningMessage($gameResult.OWIN);
    }

    xCells = [];
    oCells = [];
    emptyCells = [];
    for (let i = 1; i <= $boardSize; i++) {
        let cellIndex = i * $boardSize - i;
        if ($boardCells[cellIndex].classList.contains($markXClass)) {
            xCells.push(cellIndex);
        } else if ($boardCells[cellIndex].classList.contains($markOClass)) {
            oCells.push(cellIndex);
        } else {
            emptyCells.push(cellIndex);
        }
    }

    if (xCells.length === $boardSize) {
        showWinningMessage($gameResult.XWIN);
    } else if (oCells.length === $boardSize) {
        showWinningMessage($gameResult.OWIN);
    }

}

const checkDraw = () => {
    if ($moveCounter === 9) {
        showWinningMessage($gameResult.DRAW);
    }
}

const showWinningMessage = gameResult => {
    switch (gameResult) {
        case $gameResult.XWIN:
            $winningMessageText.innerText = 'Wygrał gracz X';
            $winningMessage.classList.add('winning-message--win-x');
            break;
        case $gameResult.OWIN:
            $winningMessageText.innerText = 'Wygrał gracz O';
            $winningMessage.classList.add('winning-message--win-o');
            break;
        case $gameResult.DRAW:
            $winningMessageText.innerText = 'REMIS';
            $winningMessage.classList.add('winning-message--draw');
            break;
    }

    $winningMessage.classList.remove('hide');
}

const switchTurn = () => {
    $currentMove = $currentMove === $moveX ? $moveO : $moveX;
    $board.classList.remove('board--move-x');
    $board.classList.remove('board--move-o');
    $board.classList.add($currentMove);
}

document.addEventListener('DOMContentLoaded', main);