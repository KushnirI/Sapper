import {app, textures} from "../index";
import {observableMixin} from "../eventHandlers/observableMixin";
import {config} from "../config";

export class MineCounter extends PIXI.Container{
    sprite: PIXI.Sprite;
    text: PIXI.Text;
    textStyle: PIXI.TextStyle;
    minesAmount: number;
    by: Function;

    constructor(x: number, y: number){
        super();
        Object.assign(this, observableMixin);
        this.sprite = this.addSprite("flagBig.png");

        this.position.set(x, y);
        this.minesAmount = config.minesAmount;
        this.text = this.addText(""+ this.minesAmount);
        this.textStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "midnightblue",
        });
        this.text.position.set(70, 10);
        this.text.style = this.textStyle;


        this.by({
            flagAdded: this.minusOne,
            flagRemoved: this.plusOne
        });

        this.addChild(this.text, this.sprite);
        app.stage.addChild(this);

    }

    /**
     * creates PIXI.Sprite on required position
     * @param {string} src texture name
     * @return {PIXI.Sprite} sprite
     */
    addSprite(src: string): PIXI.Sprite{
        let sprite: PIXI.Sprite = new PIXI.Sprite(textures[src]);
        sprite.width = 55;
        sprite.height = 55;
        sprite.position.set(10, 0);
        return sprite;
    }

    /**
     * create PIXI.Text on required position with required text style
     * @param {string} txt text
     * @return {PIXI.Text} text
     */
    addText(txt: string): PIXI.Text{
        let text: PIXI.Text = new PIXI.Text(txt);
        let textStyle:PIXI.TextStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "midnightblue",
        });
        text.position.set(70, 10);
        text.style = textStyle;
        return text;
    }

    /**
     * deduct one from minesAmount and update text
     */
    minusOne():void {
        this.minesAmount--;
        this.text.text = ""+ this.minesAmount;
    }

    /**
     * add plus one to minesAmount and update text
     */
    plusOne():void {
        this.minesAmount++;
        this.text.text = ""+ this.minesAmount;
    }




}