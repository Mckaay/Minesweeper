export const TILE_STATUSES = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked",
}

export const createBoard = (size, numberOfMines) => {
    const board = [];
    const mineCoordinates = getMinesPositions(size,numberOfMines);
    for(let x = 0; x < size; x++) {
        const row = [];
        for(let y=0; y < size; y++) {
            const mine = mineCoordinates.some(checkPosition.bind(null,{x,y}))
            row.push(createTile(x,y,mine));
        }
        board.push(row);
    }

    return board;
}

export const createTile = (x,y,mine) => {
    const newTile = document.createElement('div');
    newTile.dataset.status = TILE_STATUSES.HIDDEN;
    newTile.dataset.x = x;
    newTile.dataset.y = y;

    return {
        x,
        y,
        element: newTile,
        mine: mine,
        get status() {
            return this.element.dataset.status;
        },
        set status(value) {
            this.element.dataset.status = value;
        }
    }
}

export const findTileByCoordinates = (board, element) => {
    return board[element.dataset.x][element.dataset.y];
}

export const markTile = (tile) => {
    if (tile.status === TILE_STATUSES.NUMBER || tile.status === TILE_STATUSES.MINE) {
        return;
    }

    tile.status = tile.status === TILE_STATUSES.MARKED ? TILE_STATUSES.HIDDEN : TILE_STATUSES.MARKED;
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const getMinesPositions = (size, numberOfMines) => {
    const minePositions = [];
    for (let i = 0; i < numberOfMines; i++) {
        minePositions.push(
            {
                x: getRandomInt(numberOfMines),
                y: getRandomInt(numberOfMines),
            }
        )
    }

    return minePositions;
}

const checkPosition = (a, b) => a.x === b.x && a.y === b.y;

export const countMinesLeft = (board, numberOfMines) => {
    const markedTiles = board.flat().filter(tile => tile.status === TILE_STATUSES.MARKED);
    return numberOfMines - markedTiles.length;
};

export const revealBombs = (board) => {
    board.flat().forEach(tile => {
        if (tile.mine) tile.status = TILE_STATUSES.MINE;
    });
};

export const checkGameEnd = (board, tile) => {
    if (tile.mine && tile.status !== TILE_STATUSES.MARKED && tile.status !== TILE_STATUSES.HIDDEN) {
        revealBombs(board);
        return true;
    }
    return checkWin(board);
};

const checkWin = (board) => {
    return board.flat().every(tile =>
        (tile.mine && tile.status === TILE_STATUSES.MARKED) ||
        (!tile.mine && tile.status !== TILE_STATUSES.HIDDEN)
    );
}

const getNeighbourTiles = (tile,board) => {
    const { x, y } = tile;
    const neighbours = [];
    const rowLimit = board.length - 1;
    const colLimit = board[0]?.length - 1;

    for (let i = Math.max(0, x - 1); i <= Math.min(x + 1, rowLimit); i++) {
        for (let j = Math.max(0, y - 1); j <= Math.min(y + 1, colLimit); j++) {
            if (i !== x || j !== y) {
                neighbours.push(board[i][j]);
            }
        }
    }

    return neighbours;
}

const calculateNeighboursMines = (neighbours) => {
    return neighbours.reduce((sum,tile) => sum + (tile.mine ? 1 : 0),0);
}

export function revealTile (board, tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN) {
        return;
    }

    tile.status = TILE_STATUSES.NUMBER;
    const adjacentTiles = getNeighbourTiles(tile,board);
    const mines = calculateNeighboursMines(adjacentTiles);

    if (mines === 0) {
        adjacentTiles.forEach(t => revealTile(board,t));
    } else {
        tile.element.innerText = mines;
    }
}




