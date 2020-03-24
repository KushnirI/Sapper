interface ObjSize {
    width: number;
    height: number;
}

interface Config {
    gameArea: ObjSize;
    rows: number;
    columns: number;
    minesAmount: number;
    fieldSize: ObjSize;
}

export const config: Config = {
    gameArea: {width: 400, height: 560},
    columns: 10,
    rows: 14,
    minesAmount: 100,
    fieldSize: {width: 40, height: 40},
};
