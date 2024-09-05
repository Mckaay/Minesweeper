export const TILE_STATUSES = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked",
}

export const createBoard = (size) => {
    const board = [];
    for(let x = 0; x < size; x++) {
        const row = [];
        for(let y=0; y < size; y++) {
            row.push(createTile(x,y));
        }
        board.push(row);
    }

    return board;
}

export const createTile = (x,y) => {
    const newTile = document.createElement('div');
    newTile.dataset.status = TILE_STATUSES.HIDDEN;
    newTile.dataset.x = x;
    newTile.dataset.y = y;

    return {
        x,
        y,
        element: newTile,
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