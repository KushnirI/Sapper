
// type RectangleType = {x: number, y:number, width:number, height:number, color: number}

export class Rectangle extends PIXI.Graphics {
    constructor(x: number, y:number, width:number, height:number, color: number = 0) {
        super();

        this.lineStyle(1, 0x000000, 1);
        if(color){
            this.beginFill(color);
        }
        this.drawRect(0, 0, width, height);
        this.endFill();
        this.position.set(x, y);
    }
}