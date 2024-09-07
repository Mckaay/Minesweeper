import {
    TILE_STATUSES,
    findTileByCoordinates,
    createBoard,
    markTile,
    countMinesLeft,
    revealBombs,
    checkGameEnd,
} from "./minesweeper_.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;

const board = createBoard(BOARD_SIZE,NUMBER_OF_MINES);
const boardContainer = document.querySelector('.board');
boardContainer.style.setProperty('--size',`${BOARD_SIZE}`);

const mineCounter = document.querySelector('.mine-counter');
const updateMinesCounter = () => {
    mineCounter.innerText = `${countMinesLeft(board,NUMBER_OF_MINES)}`;
}
updateMinesCounter();

const setupBoard = () => {
    board.forEach((row) => {
        row.forEach((item) => {
            const newItem = item.element;
            boardContainer.appendChild(newItem);
        })
    })
}

const removeListeners = () => {
    boardContainer.removeEventListener("click",handleLeftClick);
    boardContainer.removeEventListener("contextmenu",handleRightClick);
}

const handleRightClick = (tile) => {
    markTile(tile);
    updateMinesCounter()
}

const handleLeftClick = (tile) => {
    if (checkGameEnd(board,tile)) {

    }
}

const setupBoardEventListeners = () => {
    boardContainer.addEventListener('contextmenu', (e) => {
        if (e.target.matches('.board > *')) {
            e.preventDefault();
            handleRightClick(findTileByCoordinates(board,e.target))
            console.log(board);
        }
    });

    boardContainer.addEventListener('click', (e) => {
        if (e.target.matches('.board > *')) {
            handleLeftClick(findTileByCoordinates(board,e.target));
        }
    });
}



setupBoard();
setupBoardEventListeners();

