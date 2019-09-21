import {app, textures} from "./index";
import {observableMixin} from "./observableMixin";
import {config} from "./config";

export class MineCounter extends PIXI.Container{
    sprite: PIXI.Sprite;
    text: PIXI.Text;
    textStyle: PIXI.TextStyle;
    minesAmount: number;
    by: Function;

    constructor(x: number, y: number){
        super();
        Object.assign(this, observableMixin);
        this.sprite = new PIXI.Sprite(textures["flagBig.png"]);
        this.sprite.width = 55;
        this.sprite.height = 55;
        this.sprite.position.set(10, 0);
        this.position.set(x, y);
        this.minesAmount = config.minesAmount;
        this.text = new PIXI.Text(""+ this.minesAmount);
        this.textStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "midnightblue",
        });
        this.text.position.set(70, 10);
        this.text.style = this.textStyle;


        this.by({
            "flagAdded": this.minusOne,
            "flagRemoved": this.plusOne
        });

        this.addChild(this.text, this.sprite);
        app.stage.addChild(this);

    }
    minusOne(){
        this.minesAmount--;
        if(this.minesAmount >= 0){
            this.text.text = ""+ this.minesAmount;
        }

    }

    plusOne(){
        this.minesAmount++;
        if(this.minesAmount >= 0){
            this.text.text = ""+ this.minesAmount;
        }
    }




}