import {GameArea} from "./gameArea";
import {Timer} from "./timerAndMineCounter/timer";
import {MineCounter} from "./timerAndMineCounter/mineCounter";
import {config} from "./config";

document.body.oncontextmenu = function(event) {
    event.preventDefault();
};

export const app = new PIXI.Application({
    width: 440, height: 660, backgroundColor: 0xB2BABB, resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);

PIXI.loader
    .add("./src/images/sheet.json")
    .load(setup);

export let gameArea: GameArea,
    textures: any,
    firstMoveDone: boolean,
    timer: Timer,
    mineCounter: MineCounter;

function setup() {
    textures = PIXI.loader.resources["./src/images/sheet.json"].textures;

    gameArea = new GameArea(20, 90);
    firstMoveDone = false;
    timer = new Timer(config.gameArea.width - 140, 15);
    mineCounter = new MineCounter(15, 15);

}

/**
 * set firstMoveDone to true
 */
export function makeFirstMoveDone(){
    firstMoveDone = true;
}