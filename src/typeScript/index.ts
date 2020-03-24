import {GameArea} from "./gameArea";
import {Timer} from "./topBar/timer";
import {MineCounter} from "./topBar/mineCounter";
import {config} from "./config";
import {scaleToWindow} from "./utils/utils";
import {PIXIScalableText} from "./PIXIScalableText";

// Ensuring no context menu on right mouse button click
document.body.oncontextmenu = event => {
    event.preventDefault();
};

export const app = new PIXI.Application({
    width: 440, height: 670, backgroundColor: 0xB2BABB, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";

scaleToWindow(app.renderer.view);
window.addEventListener("resize", () => {
    scaleToWindow(app.renderer.view);
});

PIXI.loader
    .add("./src/images/sheet.json")
    .load(setup);

export let gameArea: GameArea;
export let textures: any;
export let isFirstMoveDone: boolean;
export let timer: Timer;
export let mineCounter: MineCounter;
// export let scalableText: PIXIScalableText;
// export let style: PIXI.TextStyle;

function setup() {
    textures = PIXI.loader.resources["./src/images/sheet.json"].textures;

    gameArea = new GameArea(20, 90);
    isFirstMoveDone = false;
    timer = new Timer(config.gameArea.width - 140, 15);
    mineCounter = new MineCounter(15, 15);
    /*style = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 33,
        fill: "blue",
    })
    scalableText = new PIXIScalableText("teteteteaate", style, 500);*/
}

/**
 * set firstMoveDone to true
 */
export function onFirstMoveDone() {
    isFirstMoveDone = true;
}
