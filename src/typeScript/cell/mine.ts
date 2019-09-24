import {textures} from "../index";
import {config} from "../config";

export class Mine extends PIXI.Sprite{
    constructor(x: number, y: number, src: string){
        super(textures[src]);
        this.anchor.set(0.5);
        this.width = config.fieldSize.width*3/4;
        this.height = config.fieldSize.height*3/4;
        this.position.set(x, y);
        this.visible = false;
    }

    /**
     * makes mine visible
     */
    show() {
        this.visible = true;
    }
}