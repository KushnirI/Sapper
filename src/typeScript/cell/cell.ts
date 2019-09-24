import {Rectangle} from "../utils/rectangle";
import {NumOfMines} from "./numOfMines";
import {StubCell} from "./stubCell";
import {FlagOrQuestion} from "./flagOrQuestion";
import {Mine} from "./mine";
import {observableMixin} from "../eventHandlers/observableMixin";
import {firstMoveDone, makeFirstMoveDone} from "../index";
import {config} from "../config";


export class Cell extends PIXI.Container{
    rect: Rectangle;
    number: NumOfMines;
    stubCell: StubCell;
    flagOrQuestion: FlagOrQuestion;
    neighbors: Cell[] = [];
    mine: Mine;
    type: string;
    fireEvent: Function;
    opened: boolean;
    rightDown: boolean;
    leftDown: boolean;




    constructor(x: number, y: number, width: number, height: number){
        super();
        Object.assign(this, observableMixin);
        this.rect = new Rectangle(x - width/2, y - height/2, width, height);
        this.number = new NumOfMines(x, y);
        this.mine = new Mine(x, y, "mineBig.png");

        this.stubCell = new StubCell(x, y,"field.PNG");
        this.flagOrQuestion = new FlagOrQuestion(x, y, "flagBig.png");

        this.type = "empty";
        this.interactive = true;
        this.opened = false;
        this.rightDown = false;
        this.leftDown = false;

        this.addChild(this.rect);
        this.addChild(this.number);
        this.addChild(this.mine);
        this.addChild(this.stubCell);
        this.addChild(this.flagOrQuestion);

    }

    /**
     * if all required conditions are met open stubCell
     */
    open(){
        if(this.stubCell.enabled){
            if(!firstMoveDone){
                this.makeFirstMove()
            }

            this.openStubCell();

            if(this.type === "empty"){
                this.openNeighbors();

            } else if(this.type === "mine"){
                this.fireEvent("explosion");
                this.rect.addFill();
            }
        }

    }

    /**
     * fire event "firstMove"(start game)
     */
    makeFirstMove(){
        this.type = "start";

        makeFirstMoveDone();
        this.fireEvent("firstMove", config.minesAmount);
        if(this.number.minesNum === 0){
            this.openNeighbors();
        }
    }

    /**
     * opens stubCell
     */
    openStubCell(){
        this.stubCell.open();
        this.opened = true;
        this.fireEvent("filedOpened");
        this.flagOrQuestion.disable();

    }

    /**
     * on mouse click open cell, if it's not opened yet
     */
    click() {
        if(!this.opened){
            this.open()
        }
    }

    /**
     * on right mouse button click add/remove "flag" or "question" and disable/enable stubCell
     */
    rightclick() {
        this.addFlagOrQuestion();
    }

    mousedown(){
        if(this.opened){
            this.leftDown = true;
            if(this.rightDown){
                this.openNeighbors();
            }
        }
    }

    mouseup(){
        this.leftDown = false;
    }

    rightdown(){
        if(this.opened){
            this.rightDown = true;
            if(this.leftDown){
                this.openNeighbors();
            }
        }

    }

    rightup(){
        this.rightDown = false;
    }

    /**
     * depending on conditions add/remove "flag" or "question" and disable/enable stubCell
     */
    addFlagOrQuestion():void{
        if(!this.flagOrQuestion.enabled){
            //stub
        } else if(!this.flagOrQuestion.visible){
            this.fireEvent("flagAdded");
            this.flagOrQuestion.visible = true;
            this.stubCell.enabled = false;

        } else if( this.flagOrQuestion.type === "flag") {
            this.flagOrQuestion.changeType();
            this.fireEvent("flagRemoved");

        } else {
            this.flagOrQuestion.visible = false;
            this.stubCell.enabled = true;
            this.flagOrQuestion.changeType()
        }
    }

    /**
     * open all neighboring cells which not opened yet
     */
    openNeighbors(){
        this.neighbors.forEach( (neibor) =>{
            if(!neibor.opened){
                neibor.open();
            }
        })
    }

    /**
     * add mine and make plus one to cell.number of neighboring cells
     */
    addMine(){
        this.type = "mine";
        this.number.hide();
        this.mine.show();
        this.neighbors.forEach( neighbor => {
            neighbor.addOne();
        })

    }

    /**
     * if conditions are met add plus one to cell.number
     */
    addOne() {
        if(this.type !== "mine"){
            this.number.addOne();
            if(this.type !== "start"){
                this.type = "number"
            }
        }
    }

    /**
     * removes interactive
     */
    removeInteractive(){
        this.interactive = false;
    }

}