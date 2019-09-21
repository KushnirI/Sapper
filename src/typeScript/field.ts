import {Rectangle} from "./rectangle";
import {NumOfMines} from "./NumOfMines";
import {FirstLayer} from "./firstLayer";
import {SecondLayer} from "./secondLayer";
import {Mine} from "./mine";
import {observableMixin} from "./observableMixin";
import {firstMoveDone, makeFirstMove} from "./index";
import {config} from "./config";

export class Field extends PIXI.Container{
    rect: any;
    number: NumOfMines;
    firstLayer: FirstLayer;
    secondLayer: SecondLayer;
    neighbors: Field[] = [];
    mine: Mine;
    type: string;
    fireEvent: Function;
    by: Function;



    constructor(x: number, y: number, width: number, height: number){
        super();
        Object.assign(this, observableMixin);
        this.rect = new Rectangle(x - width/2, y - height/2, width, height);
        this.number = new NumOfMines(x, y, this);
        this.mine = new Mine(x, y, "mineBig.png");

        this.firstLayer = new FirstLayer(x, y, this.callback.bind(this), "field.PNG", this);
        this.secondLayer = new SecondLayer(x, y, "flagBig.png");

        this.type = "null";

        this.addChild(this.rect, this.number, this.mine, this.firstLayer, this.secondLayer);

    }

    callback():void{
        if(!this.secondLayer.visible){
            this.fireEvent("flagAdded", null);
            this.secondLayer.visible = true;
            this.firstLayer.enable = false;
        } else if( this.secondLayer.type === "flag") {
            this.secondLayer.changeType();
            this.fireEvent("flagRemoved", null);
        } else {
            this.secondLayer.visible = false;
            this.firstLayer.enable = true;
            this.secondLayer.changeType()
        }
    }

    openNeighbors(){
        this.neighbors.forEach( (neibor) =>{
            if(!neibor.firstLayer.opened){
                neibor.firstLayer.open();
            }
        })
    }

    addMine(){
        this.type = "mine";
        this.number.disable();
        this.mine.enable();
        this.neighbors.forEach( neighbor => {
            neighbor.number.addOne();
        })

    }

    enable(){
        this.firstLayer.enable = true;
    }

    removeInteractive(){
        this.firstLayer.interactive = false;
    }


}