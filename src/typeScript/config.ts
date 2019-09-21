type ObjSize = {width: number, height: number};

export const config : {
    gameArea: ObjSize,
    rowsAndColumns : {rows:number, colums: number },
    minesAmount: number,
    fieldSize: ObjSize
    } = {
    gameArea: {width: 400, height: 560},
    rowsAndColumns: {colums:10, rows:14,},
    minesAmount: 20,
    fieldSize: {width: 40, height: 40}
};
