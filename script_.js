import {
    TILE_STATUSES,
    createBoard,
} from "./minesweeper.js";

const BOARD_SIZE = 10;

const board = createBoard(BOARD_SIZE);
const boardContainer = document.querySelector('.board');
boardContainer.style.setProperty('--size',`${BOARD_SIZE}`);

const setupBoard = () => {
    board.forEach((row) => {
        row.forEach((item) => {
            const newItem = item.element;
            boardContainer.appendChild(newItem);
        })
    })
}

setupBoard();