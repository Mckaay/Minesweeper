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

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
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
    if (tile.mine) {
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




