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