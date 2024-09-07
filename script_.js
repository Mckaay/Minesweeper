import {
    findTileByCoordinates,
    createBoard,
    markTile,
    countMinesLeft,
    checkGameEnd,
    revealTile,
} from "./minesweeper_.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;

let board = createBoard(BOARD_SIZE,NUMBER_OF_MINES);
const boardContainer = document.querySelector('.board');
boardContainer.style.setProperty('--size',`${BOARD_SIZE}`);
const refreshButton = document.querySelector('.refresh-icon');

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

const stopEventPropagation = (e) => {
    e.stopImmediatePropagation();
}

const removeListeners = () => {
    boardContainer.addEventListener("click", stopEventPropagation, { capture: true })
    boardContainer.addEventListener("contextmenu", stopEventPropagation, { capture: true })
}

const handleRightClick = (tile) => {
    markTile(tile);
    updateMinesCounter();
    if (checkGameEnd(board,tile)) {
        removeListeners();
    }
}

const handleLeftClick = (tile) => {
    revealTile(board,tile);
    if (checkGameEnd(board,tile)) {
        removeListeners();
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

    refreshButton.addEventListener('click', () => {
        refreshGame();
    })
}
const setupGame = () => {
    setupBoard();
    setupBoardEventListeners();
}

const removeBoard = () => {
    document.querySelectorAll('.board > *').forEach(el => el.remove());
}
const refreshGame = () => {
    removeBoard();
    boardContainer.removeEventListener("click", stopEventPropagation)
    boardContainer.removeEventListener("contextmenu", stopEventPropagation)
    board = createBoard(BOARD_SIZE,NUMBER_OF_MINES);
    setupGame();
}

setupGame();
