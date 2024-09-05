import {
    TILE_STATUSES,
    findTileByCoordinates,
    createBoard,
    markTile,
} from "./minesweeper_.js";

const BOARD_SIZE = 10;

const board = createBoard(BOARD_SIZE);
const boardContainer = document.querySelector('.board');
boardContainer.style.setProperty('--size',`${BOARD_SIZE}`);

const mineCounter = document.querySelector('.mine-counter');

const setupBoard = () => {
    board.forEach((row) => {
        row.forEach((item) => {
            const newItem = item.element;
            boardContainer.appendChild(newItem);
        })
    })
}

const handleRightClick = (tile) => {
    markTile(tile);
}

const setupBoardEventListeners = () => {
    boardContainer.addEventListener('contextmenu', (e) => {
        if (e.target.matches('.board > *')) {
            e.preventDefault();
            handleRightClick(findTileByCoordinates(board,e.target))
        }
    });

    boardContainer.addEventListener('click', (e) => {
        if (e.target.matches('.board > *')) {
            const tile = findTileByCoordinates(board,e.target);
            console.log(tile);
        }
    });
}

setupBoard();
setupBoardEventListeners();

