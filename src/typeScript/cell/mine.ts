import {textures} from "../index";
import {config} from "../config";

export class Mine extends PIXI.Sprite {
    constructor(x: number, y: number, src: string) {
        super(textures[src]);

        // Making mine 0.75 size of the cell to ensure it fits perfect in it:
        this.width = config.fieldSize.width * 3 / 4;
        this.height = config.fieldSize.height * 3 / 4;
        this.anchor.set(0.5);
        this.position.set(x, y);
        this.visible = false;
    }

    /**
     * makes mine visible when it's blown up
     */
    show() {
        this.visible = true;
    }
}
