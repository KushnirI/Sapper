type ObjSize = {width: number, height: number};

interface IConfig {
    gameArea: ObjSize,
    rowsAndColumns : {rows:number, columns: number},
    minesAmount: number,
    fieldSize: ObjSize
}

export const config : IConfig = {
    gameArea: {width: 400, height: 560},
    rowsAndColumns: {columns:10, rows:14,},
    minesAmount: 15,
    fieldSize: {width: 40, height: 40}
};
