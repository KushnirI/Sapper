type ObjSize = {width: number, height: number};

interface IConfig {
    gameArea: ObjSize,
    rowsAndColumns : {rows:number, colums: number },
    minesAmount: number,
    fieldSize: ObjSize
}

export const config : IConfig = {
    gameArea: {width: 400, height: 560},
    rowsAndColumns: {colums:10, rows:14,},
    minesAmount: 10,
    fieldSize: {width: 40, height: 40}
};
