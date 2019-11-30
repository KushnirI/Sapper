import {app, textures} from "../index";
import {ObservableMixin, observableMixin} from "../eventHandlers/observableMixin";

export interface Timer extends PIXI.Container, ObservableMixin {
    sprite: PIXI.Sprite;
    text: PIXI.Text;
    seconds: number;
    timerID: number;
}

export class Timer extends PIXI.Container {
    constructor(x: number, y: number) {
        super();

        Object.assign(this, observableMixin);

        this.sprite = this.addSprite("clock.png");
        this.text = this.addText("00:00");
        this.seconds = 0;

        this.by({
            firstMove: this.start,
            explosion: this.stop,
            victory: this.stop,
        });

        this.position.set(x, y);
        this.addChild(this.text, this.sprite);
        app.stage.addChild(this);
    }

    /**
     * creates PIXI.Sprite on required position
     * @param {string} src texture name
     * @return {PIXI.Sprite} sprite
     */
    addSprite(src: string): PIXI.Sprite {
        const sprite: PIXI.Sprite = new PIXI.Sprite(textures[src]);
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
    addText(txt: string): PIXI.Text {
        const textStyle: PIXI.TextStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "midnightblue",
        });
        const text: PIXI.Text = new PIXI.Text(txt, textStyle);

        text.position.set(0, 10);

        return text;
    }

    /**
     * start timer ticks every second and every minute
     */
    start(): void {
        this.timerID = setInterval(() => {
            let secondsText: string;
            let minutesText: string;

            this.seconds++;

            const secondsPassed = this.seconds % 60;
            const minutesPassed = Math.floor(this.seconds / 60);

            // Ensuring that at least two digits shown
            secondsText = "00".length > `${secondsPassed}`.length ? `0${secondsPassed}` : `${secondsPassed}`;
            minutesText = "00".length > `${minutesPassed}`.length ? `0${minutesPassed}` : `${minutesPassed}`;

            this.text.text = minutesText + ":" + secondsText;
        }, 1000);
    }

    /**
     * stop timer
     */
    stop(): void {
        clearInterval(this.timerID);
    }
}
