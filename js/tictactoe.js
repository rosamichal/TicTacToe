const $moveX = 'board--move-x';
const $moveO = 'board--move-o';
const $markXClass = 'board__cell--x';
const $markOClass = 'board__cell--o';

let $boardCells;
let $board;
let $winningMessage;
let $winningMessageText;

let $currentMove = $moveX;
let $moveCounter = 0;

const main = () => {
    prepareDOMElements();
    newGame();
}

const prepareDOMElements = () => {
    $board = document.querySelector('.board--js');
    $boardCells = document.querySelectorAll('.board__cell--js');
    $winningMessage = document.querySelector('.winning-message--js');
    $winningMessageText = document.querySelector('.winning-message__text--js');
}

const newGame = () => {
    reset();
}

const reset = () => {
    $boardCells.forEach(cell => {
        cell.addEventListener('click', markCell, {once: true});
    });
    $winningMessage.classList.remove('winning-message--win-o');
    $winningMessage.classList.remove('winning-message--win-x');
    $winningMessage.classList.remove('winning-message--draw');
    $winningMessage.classList.add('hide');

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

}

const checkDraw = () => {
    if ($moveCounter === 9){
        console.log('remis');
        $winningMessageText.innerText = 'REMIS';
        $winningMessage.classList.remove('hide');
        $winningMessage.classList.add('winning-message--draw');
    }
}

const switchTurn = () => {
    $currentMove = $currentMove === $moveX ? $moveO : $moveX;
    $board.classList.remove('board--move-x');
    $board.classList.remove('board--move-o');
    $board.classList.add($currentMove);
}
    
document.addEventListener('DOMContentLoaded', main);