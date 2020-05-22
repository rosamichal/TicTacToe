const $moveX = 'board--move-x';
const $moveO = 'board--move-o';

let $boardCells;
let $board;
let $currentMove = $moveX;

const main = () => {
    prepareDOMElements();
    newGame();
}

const prepareDOMElements = () => {
    $board = document.querySelector('.board--js');
    $boardCells = document.querySelectorAll('.board__cell--js');
}

const newGame = () => {
    reset();
}

const reset = () => {
    $boardCells.forEach(cell => {
        cell.addEventListener('click', markCell, {once: true});
    });

    $board.classList.add($currentMove);
}

const markCell = () => {
    putMark();
    checkWin();
    checkDraw();
    switchTurn();
}

const putMark = () => {

}

const checkWin = () => {

}

const checkDraw = () => {

}

const switchTurn = () => {
    $currentMove = $currentMove === $moveX ? $moveO : $moveX;
    $board.classList.remove('board--move-x');
    $board.classList.remove('board--move-o');
    $board.classList.add($currentMove);
}
    
document.addEventListener('DOMContentLoaded', main);