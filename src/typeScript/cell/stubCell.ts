import {textures} from "../index";
import {config} from "../config";



export class StubCell extends PIXI.Sprite {
    enabled: boolean;

    constructor(x: number, y: number, src: string) {
        super(textures[src]);
        this.anchor.set(0.5);
        this.width = config.fieldSize.width;
        this.height = config.fieldSize.height;
        this.position.set(x, y);
        this.enabled = true;
    }

    /**
     * hide stubCell
     */
    open() {
        this.visible = false;
    }
}