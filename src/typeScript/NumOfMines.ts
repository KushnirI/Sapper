import {Field} from "./field";

export class NumOfMines extends PIXI.Text{
    styles: PIXI.TextStyle[];
    minesNum: number;


    constructor(x:number, y: number, public parent: Field){
        super("");
        this.styles = this.addStyles();
        this.anchor.set(0.5);
        this.position.set(x, y);
        this.minesNum = 0;

    }

    addOne() {
        if(this.parent.type !== "mine"){
            this.minesNum++;
            this.style = this.styles[this.minesNum];
            this.text = this.minesNum + "";
            if(this.parent.type !== "start"){
                this.parent.type = "number"
            }
        }
    }

    disable() {
        this.visible = false;
    }

    addStyles():PIXI.TextStyle[]{
        let stylesArr: PIXI.TextStyle[] = [];
        let colors: string[] = ["grey", "blue","green","red", "navy", "maroon", "darkgreen","indigo", "sienna"];

        for(let i = 0; i < colors.length; i++) {
            stylesArr.push(new PIXI.TextStyle({
                fontFamily: "Arial",
                fontSize: 33,
                fill: colors[i],
            }))
        }
        return stylesArr;
    }
}