import {config} from "./config";
import {Rectangle} from "./utils/rectangle";
import {app} from "./index";
import {Cell} from "./cell/cell";
import {randomInt} from "./utils/utils";
import {observableMixin} from "./eventHandlers/observableMixin";

export class GameArea extends PIXI.Container{
    area: any;
    cellsArr: Cell[][];
    mineArr: Cell[];
    fireEvent: Function;
    availableFiledCounter: number;
    by: Function;

    constructor(x: number, y: number){
        super();
        Object.assign(this, observableMixin);
        this.area = new Rectangle(0,0, config.gameArea.width, config.gameArea.height);
        this.cellsArr = this.addCells(config.rowsAndColumns.rows, config.rowsAndColumns.columns, config.fieldSize.width, config.fieldSize.height);

        this.defineNeighboringCells(this.cellsArr);
        this.by({
            firstMove: this.addMines,
            explosion: this.gameOver,
            filedOpened: this.updateCounter

        });
        this.availableFiledCounter = config.rowsAndColumns.rows * config.rowsAndColumns.columns - config.minesAmount;
        // this.mineArr = this.addMines(config.minesAmount);
        this.position.set(x, y);
        this.addChild(this.area);
        app.stage.addChild(this);
    }

    /**
     * add cells to 2d array
     * @param {Number} rows amount of rows
     * @param {Number} columns amount of columns
     * @param {Number} width cell's width
     * @param {Number} height cell's height
     * @returns {Array} 2d array of Cells
     */
    addCells(rows:number, columns: number, width: number, height: number) : Cell[][]{
        let arr2D: Cell[][] = [];
        let x:number = width/2;
        let y:number = height/2;
        for(let i = 0; i < rows; i++) {

            let arr: any[] = [];
            for(let j = 0; j < columns; j++){
                let filed = new Cell(x + width*j,y + height*i, width, height);
                arr.push(filed);
                this.addChild(filed);
            }
            arr2D.push(arr);
        }
        return arr2D;
    }

    /**
     * For each cell define and add to cell.neighbors arr, neighboring cells
     * @param {Array} arr2D 2d array of cells
     */
    defineNeighboringCells(arr2D:Cell[][]):void {
        for(let i = 0; i < arr2D.length; i++){

            let insideArr: Cell[];
            let previousArr: Cell[];
            let nextArr:Cell[];


            if(arr2D[i - 1]){
                previousArr = arr2D[i - 1];
            }

            if(arr2D[i + 1]){
                nextArr = arr2D[i + 1];
            }

            insideArr = arr2D[i];

            for(let j = 0; j < insideArr.length; j++){
                let curFiled: Cell = insideArr[j];
                let lineBefore:Cell;
                let lineAfter:Cell;


                if(insideArr[j - 1]){
                    lineBefore = insideArr[j - 1]
                }
                if(insideArr[j + 1]){
                    lineAfter = insideArr[j + 1]
                }

                if(previousArr){
                    if(lineBefore){
                        curFiled.neighbors.push(previousArr[j-1])
                    }
                    if(lineAfter){
                        curFiled.neighbors.push(previousArr[j+1])
                    }
                    curFiled.neighbors.push(previousArr[j])
                }

                if(nextArr){
                    if(lineBefore){
                        curFiled.neighbors.push(nextArr[j-1])
                    }
                    if(lineAfter){
                        curFiled.neighbors.push(nextArr[j+1])
                    }
                    curFiled.neighbors.push(nextArr[j])
                }

                if(lineBefore){
                    curFiled.neighbors.push(insideArr[j-1])
                }
                if(lineAfter){
                    curFiled.neighbors.push(insideArr[j+1])
                }
            }
        }
    }

    /**
     * randomly add mines to cells in cellsArr
     * @param {Number} minesAmount amount of mines
     */
    addMines(minesAmount:number):void{
        let minesArr: Cell[] = [];

        for(let i = 0; i < minesAmount; i++){
            let row: number = randomInt(0, config.rowsAndColumns.rows-1);
            let column: number = randomInt(0, config.rowsAndColumns.columns-1);
            let cell: Cell = this.cellsArr[row][column];

            if(cell.type !== "mine" && cell.type !== "start"){
                cell.addMine();
                minesArr.push(cell)
            } else {
                i--;
            }

        }
        this.mineArr = minesArr;

    }

    /**
     * on event "filedOpened" deduct availableFiledCounter
     * if no more availableFiled left, fire event "victory"
     */
    updateCounter():void {
        this.availableFiledCounter--;
        console.log(this.availableFiledCounter);
        if(this.availableFiledCounter === 0){
            this.fireEvent("victory");
            this.removeInteractiveAll()
        }
    }

    /**
     * shows all mines and remove cells interactive
     */
    gameOver():void{
        this.explosion();
        this.removeInteractiveAll();
    }

    /**
     * shows all mines
     */
    explosion():void{
        this.mineArr.forEach( cell => {
            cell.flagOrQuestion.visible = false;
            cell.type = "exploded";
            cell.stubCell.open();
        })
    }

    /**
     * remove cells interactive
     */
    removeInteractiveAll():void{
        this.cellsArr.forEach( arr => {
            arr.forEach( cell => {
                cell.removeInteractive()
            })
        })
    }

}