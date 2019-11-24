export class Rectangle extends PIXI.Graphics {
    constructor(x: number, y:number, width:number, height:number, color: number = 0) {
        super();

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.lineStyle(1, 0x000000, 1);
        if(color){
            this.beginFill(color);
        }
        this.drawRect(0, 0, width, height);
        this.endFill();
        this.position.set(x, y);
    }

    /**
     * adds red-filled rectangle
     */
    addFill(){
        this.lineStyle(0, 0x000000, 0);
        this.beginFill(0xB22222);

        this.drawRect(0, 0, this.width, this.height);
        this.endFill();
        this.position.set(this.x, this.y);

    }

}