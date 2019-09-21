import {textures} from "./index";
import {config} from "./config";

export class SecondLayer extends PIXI.Sprite{
    type:string;
    constructor(x: number, y: number, src: string){
        super(textures[src]);
        this.anchor.set(0.5);
        this.width = config.fieldSize.width*3/4;
        this.height = config.fieldSize.height*3/4;
        this.position.set(x, y);
        this.interactive = false;
        this.visible = false;
        this.type = "flag"
    }

    changeType():void{
        if(this.type === "flag"){
            this.type = "?";
            this.texture = textures["question.png"];
        } else {
            this.type = "flag";
            this.texture = textures["flagBig.png"];
        }
    }

}