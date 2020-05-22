let $boardCells;


const main = () => {
    prepareDOMElements();
    newGame();
}

const prepareDOMElements = () => {
    $boardCells = document.querySelectorAll('.board__cell--js');
}

const newGame = () => {
    reset();
}

const reset = () => {
    $boardCells.forEach(cell => {
        cell.addEventListener('click', markCell, {once: true});
    });
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

}

document.addEventListener('DOMContentLoaded', main);