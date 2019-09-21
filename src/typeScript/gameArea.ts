import {config} from "./config";
import {Rectangle} from "./rectangle";
import {app} from "./index";
import {Field} from "./field";
import {randomInt} from "./utils";
import {observableMixin} from "./observableMixin";

export class GameArea extends PIXI.Container{
    area: any;
    filedsArr: Field[][];
    mineArr: Field[];
    fireEvent: Function;
    availableFiledCounter: number;
    by: Function;

    constructor(x: number, y: number){
        super();
        Object.assign(this, observableMixin);
        this.area = new Rectangle(0,0, config.gameArea.width, config.gameArea.height);
        this.filedsArr = this.addFields(config.rowsAndColumns.rows, config.rowsAndColumns.colums, config.fieldSize.width, config.fieldSize.height);

        this.getNeighbors(this.filedsArr);
        this.by({
            "firstMove": this.addMines,
            "explosion": this.gameOver,
            "filedOpened": this.updateCounter

        });
        this.availableFiledCounter = config.rowsAndColumns.rows * config.rowsAndColumns.colums - config.minesAmount;
        // this.mineArr = this.addMines(config.minesAmount);
        this.position.set(x, y);
        this.addChild(this.area);
        app.stage.addChild(this);
    }

    addFields(rows:number, colums: number, width: number, height: number) : Field[][]{
        let arr2D: Field[][] = [];
        let x:number = width/2;
        let y:number = height/2;
        for(let i = 0; i < rows; i++) {

            let arr: any[] = [];
            for(let j = 0; j < colums; j++){
                let filed = new Field(x + width*j,y + height*i, config.fieldSize.width, config.fieldSize.height);
                arr.push(filed);
                this.addChild(filed);
            }
            arr2D.push(arr);
        }
        return arr2D;
    }

    getNeighbors(arr2D:Field[][]):void {
        for(let i = 0; i < arr2D.length; i++){

            let insideArr: Field[];
            let previousArr: Field[];
            let nextArr:Field[];


            if(arr2D[i - 1]){
                previousArr = arr2D[i - 1];
            }

            if(arr2D[i + 1]){
                nextArr = arr2D[i + 1];
            }

            insideArr = arr2D[i];

            for(let j = 0; j < insideArr.length; j++){
                let curFiled: Field = insideArr[j];
                let lineBefore:Field;
                let lineAfter:Field;


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

    addMines(minesAmount:number):void{
        let minesArr: Field[] = [];

        for(let i = 0; i < minesAmount; i++){
            let row: number = randomInt(0, config.rowsAndColumns.rows-1);
            let colum: number = randomInt(0, config.rowsAndColumns.colums-1);
            let filed: Field = this.filedsArr[row][colum];

            if(filed.type !== "mine" && filed.type !== "start"){
                filed.addMine();
                minesArr.push(filed)
            } else {
                i--;
            }

        }
        this.mineArr = minesArr;

    }

    updateCounter():void {
        this.availableFiledCounter--;
        if(this.availableFiledCounter < 0){
            this.fireEvent("victory", null);
            this.removeInteractiveAll()
        }
    }


    gameOver():void{
        this.enableAll();
        this.explosion();
        this.removeInteractiveAll();
    }

    enableAll():void{
        this.filedsArr.forEach( arr => {
            arr.forEach( filed => {
                filed.enable()
            })
        })
    }

    explosion():void{
        this.mineArr.forEach( filed => {
            filed.secondLayer.visible = false;
            filed.type = "exploaded";
            filed.firstLayer.open();
        })
    }

    removeInteractiveAll():void{
        this.filedsArr.forEach( arr => {
            arr.forEach( filed => {
                filed.removeInteractive()
            })
        })
    }



}