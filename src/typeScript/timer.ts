import {app, textures} from "./index";
import {observableMixin} from "./observableMixin";

export class Timer extends PIXI.Container{
    sprite: PIXI.Sprite;
    text: PIXI.Text;
    textStyle: PIXI.TextStyle;
    seconds: number;
    minutes: number;
    by: Function;
    timerID: number;

    constructor(x: number, y: number){
        super();
        Object.assign(this, observableMixin);
        this.sprite = new PIXI.Sprite(textures["clock.png"]);
        this.sprite.width = 55;
        this.sprite.height = 55;
        this.sprite.position.set(100, 0);
        this.position.set(x, y);
        this.text = new PIXI.Text("00:00");
        this.textStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "midnightblue",
        });
        this.text.position.set(0, 10);
        this.text.style = this.textStyle;

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

    start(){
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

    stop() {
        clearInterval(this.timerID);
    }

}