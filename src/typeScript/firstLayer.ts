import {textures, firstMoveDone, makeFirstMove} from "./index";
import {config} from "./config";
import {Field} from "./field";


export class FirstLayer extends PIXI.Sprite{
    enable: boolean;
    callback: Function;
    opened: boolean;

    constructor(x: number, y: number, callback: Function, src: string, public parent: Field){
        super(textures[src]);
        this.anchor.set(0.5);
        this.width = config.fieldSize.width;
        this.height = config.fieldSize.height;
        this.position.set(x, y);
        this.interactive = true;
        this.enable = true;
        this.callback = callback;
        this.opened = false;
    }

    open(){

        if(this.enable){
            if(!firstMoveDone){
                this.parent.type = "start";

                makeFirstMove();
                this.parent.fireEvent("firstMove", config.minesAmount);
                if(this.parent.number.minesNum === 0){
                    this.parent.openNeighbors();
                }
            }
            this.visible = false;
            this.opened = true;
            this.parent.fireEvent("filedOpened", null);
            if(this.parent.type === "null"){
                this.parent.openNeighbors();
            } else if(this.parent.type === "mine"){
                this.parent.rect.beginFill(0xFF0000);
                this.parent.fireEvent("explosion");
            }
        }

    }
    click() {
        this.open()
    }


    rightclick() {
        this.callback();
    }
}