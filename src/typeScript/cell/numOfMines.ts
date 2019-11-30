export class NumOfMines extends PIXI.Text {
    styles: PIXI.TextStyle[];
    minesNum: number;

    constructor(x: number, y: number) {
        super("");

        this.styles = this.addStyles();
        this.anchor.set(0.5);
        this.position.set(x, y);
        this.minesNum = 0;
    }

    /**
     * add one to minesNum, update text and style
     */
    addOne() {
        this.minesNum++;
        this.style = this.styles[this.minesNum];
        this.text = this.minesNum + "";
    }

    /**
     * hide numOfMines in case cell contains mine
     */
    hide() {
        this.visible = false;
    }

    /**
     * create and return array with PIXI.TextStyle
     * @returns {Array} stylesArr array with PIXI.TextStyle
     */
    addStyles(): PIXI.TextStyle[] {
        const colors: string[] = ["grey", "blue", "green", "red", "navy", "maroon", "darkgreen", "indigo", "sienna"];

        return colors.map(color => {
            return new PIXI.TextStyle({
                fontFamily: "Arial",
                fontSize: 33,
                fill: color,
            });
        });
    }
}
