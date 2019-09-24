import {app, textures} from "../index";
import {observableMixin} from "../eventHandlers/observableMixin";

export class Timer extends PIXI.Container{
    sprite: PIXI.Sprite;
    text: PIXI.Text;
    seconds: number;
    minutes: number;
    by: Function;
    timerID: number;

    constructor(x: number, y: number){
        super();
        Object.assign(this, observableMixin);
        this.position.set(x, y);
        this.sprite = this.addSprite("clock.png");
        this.text = this.addText("00:00");

        this.seconds = 0;
        this.minutes = 0;

        this.by({
            "firstMove": this.start,
            "explosion": this.stop,
            "victory": this.stop
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
        sprite.position.set(100, 0);
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
        text.position.set(0, 10);
        text.style = textStyle;
        return text;
    }

    /**
     * start timer
     */
    start():void{
        this.timerID = setInterval( ()=>{
            let secondsText:string;
            let minutesText:string;

            this.seconds++;
            if(this.seconds < 10){
                secondsText = "0" + this.seconds;
            } else if(this.seconds < 60){
                secondsText = "" + this.seconds;
            } else {
                this.minutes++;
                this.seconds = 0;
                secondsText = "00"
            }
            if(this.minutes < 10){
                minutesText = "0" + this.minutes;
            } else {
                minutesText = "" + this.minutes;
            }

            this.text.text = minutesText + ":" + secondsText;
        }, 1000)
    }

    /**
     * stop timer
     */
    stop():void {
        clearInterval(this.timerID);
    }

}