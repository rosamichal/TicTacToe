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
let $boardSizeSelect;

let $currentMove = $moveX;
let $moveCounter = 0;
let $boardSize = 3;

const main = () => {
    prepareDOMElements();
    newGame();
}

const prepareDOMElements = () => {
    $board = document.querySelector('.board--js');
    $winningMessage = document.querySelector('.winning-message--js');
    $winningMessageText = document.querySelector('.winning-message__text--js');
    $winningMessageButton = document.querySelector('.winning-message__button--js');
    $boardSizeSelect = document.querySelector('.board-size--js');

    $winningMessageButton.addEventListener('click', newGame);
    $boardSizeSelect.addEventListener('change', reset);
}

const newGame = () => {
    reset();
}

const reset = () => {
    generateCells();
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

const generateCells = () => {
    $boardSize = parseInt($boardSizeSelect.value, 10);
    $board.innerHTML = '';
    $board.style.setProperty('--board-size', $boardSize);

    for (let i = 0; i < $boardSize * $boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('board__cell', 'board__cell--js');
        $board.appendChild(cell);
    }

    $boardCells = document.querySelectorAll('.board__cell--js');
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
    let xCells = 0;
    let oCells = 0;
    
    // check rows
    for (let i = 0; i < $boardSize; i++) {
        xCells = 0;
        oCells = 0;
        for (let j = 0; j < $boardSize; j++) {
            let cellIndex = i * $boardSize + j;
            if ($boardCells[cellIndex].classList.contains($markXClass)) {
                xCells++;
            } else if ($boardCells[cellIndex].classList.contains($markOClass)) {
                oCells++;
            }
        }

        if (xCells === $boardSize) {
            showWinningMessage($gameResult.XWIN);
            return;
        } else if (oCells === $boardSize) {
            showWinningMessage($gameResult.OWIN);
            return;
        }
    }

    // columns
    for (let i = 0; i < $boardSize; i++) {
        xCells = 0;
        oCells = 0;
        for (let j = 0; j < $boardSize; j++) {
            let cellIndex = i + j * $boardSize;
            if ($boardCells[cellIndex].classList.contains($markXClass)) {
                xCells++;
            } else if ($boardCells[cellIndex].classList.contains($markOClass)) {
                oCells++;
            }
        }

        if (xCells === $boardSize) {
            showWinningMessage($gameResult.XWIN);
            return;
        } else if (oCells === $boardSize) {
            showWinningMessage($gameResult.OWIN);
            return;
        }
    }

    // diagonals
    xCells = 0;
    oCells = 0;
    for (let i = 0; i < $boardSize; i++) {
        let cellIndex = i + i * $boardSize;
        if ($boardCells[cellIndex].classList.contains($markXClass)) {
            xCells++;
        } else if ($boardCells[cellIndex].classList.contains($markOClass)) {
            oCells++;
        }
    }

    if (xCells === $boardSize) {
        showWinningMessage($gameResult.XWIN);
        return;
    } else if (oCells === $boardSize) {
        showWinningMessage($gameResult.OWIN);
        return;
    }

    xCells = 0;
    oCells = 0;
    for (let i = 1; i <= $boardSize; i++) {
        let cellIndex = i * $boardSize - i;
        if ($boardCells[cellIndex].classList.contains($markXClass)) {
            xCells++;
        } else if ($boardCells[cellIndex].classList.contains($markOClass)) {
            oCells++;
        }
    }

    if (xCells === $boardSize) {
        showWinningMessage($gameResult.XWIN);
        return;
    } else if (oCells === $boardSize) {
        showWinningMessage($gameResult.OWIN);
        return;
    }

}

const checkDraw = () => {
    if ($moveCounter === ($boardSize * $boardSize)) {
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