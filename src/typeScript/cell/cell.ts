import {Rectangle} from "../utils/rectangle";
import {NumOfMines} from "./numOfMines";
import {StubCell} from "./stubCell";
import {FlagOrQuestion} from "./flagOrQuestion";
import {Mine} from "./mine";
import {ObservableMixin, observableMixin} from "../eventHandlers/observableMixin";
import {isFirstMoveDone, onFirstMoveDone} from "../index";
import {config} from "../config";

export interface Cell extends PIXI.Container, ObservableMixin {
    rect: Rectangle;
    number: NumOfMines;
    stubCell: StubCell;
    flagOrQuestion: FlagOrQuestion;
    neighbors: Cell[];
    mine: Mine;
    type: "empty" | "start" | "mine" | "number" | "exploded";
    opened: boolean;
    rightDown: boolean;
    leftDown: boolean;
}

export class Cell extends PIXI.Container {
    constructor(x: number, y: number, width: number, height: number) {
        super();

        Object.assign(this, observableMixin);
        this.rect = this.addChild(new Rectangle(x - width / 2, y - height / 2, width, height));
        this.number = this.addChild(new NumOfMines(x, y));
        this.mine = this.addChild(new Mine(x, y, "mineBig.png"));

        this.stubCell = this.addChild(new StubCell(x, y, "field.PNG"));
        this.flagOrQuestion = this.addChild(new FlagOrQuestion(x, y, "flagBig.png"));
        this.type = "empty";

        this.neighbors = [];
        this.opened = false;
        this.rightDown = false;
        this.leftDown = false;
        this.interactive = true;

        this.hitArea = new PIXI.Rectangle(x - width / 2, y - height / 2, width, height);
    }

    /**
     * if all required conditions are met open stubCell
     */
    open() {
        if (!this.stubCell.enabled) {
            return;
        }

        if (!isFirstMoveDone) {
            this.makeFirstMove();
        }

        this.openStubCell();

        if (this.type === "empty") {
            this.openNeighbors();
        } else if (this.type === "mine") {
            this.fireEvent("explosion");
            this.rect.addFill();
        }
    }

    /**
     * fire event "firstMove"(start game)
     */
    makeFirstMove() {
        this.type = "start";
        this.opened = true;

        onFirstMoveDone();
        this.fireEvent("firstMove", config.minesAmount);
        if (this.number.minesNum === 0) {
            this.openNeighbors();
        }
    }

    /**
     * opens stubCell
     */
    openStubCell() {
        this.stubCell.open();
        this.opened = true;
        this.fireEvent("cellOpened");
        this.flagOrQuestion.disable();
    }

    /**
     * on mouse click open cell, if it's not opened yet
     */
    click() {
        if (!this.opened) {
            this.open();
        }
    }

    /**
     * on right mouse button click add/remove "flag" or "question" and disable/enable stubCell
     */
    rightclick() {
        if (!this.opened) {
            this.addFlagOrQuestion();
        }
    }

    /**
     * processes left mouse button down on given cell
     */
    mousedown() {
        if (!this.opened) {
            return;
        }

        this.leftDown = true;

        if (this.rightDown) {
            /*if all neighboring mines are marked open closed neighboring cells when both mouse buttons are clicked
            simultaneously*/
            if (this.getFlaggedNeighborsNum() === this.number.minesNum) {
                this.openNeighbors();
            }
        }
    }

    /**
     * processes left mouse button up on given cell
     */
    mouseup() {
        this.leftDown = false;
    }

    /**
     * processes right mouse button down on given cell
     */
    rightdown() {
        if (!this.opened) {
            return;
        }

        this.rightDown = true;

        if (this.leftDown) {
            /*if all neighboring mines are marked open closed neighboring cells when both mouse buttons are clicked
            simultaneously*/
            if (this.getFlaggedNeighborsNum() === this.number.minesNum) {
                this.openNeighbors();
            }
        }
    }

    /**
     * processes right mouse button up on given cell
     */
    rightup() {
        this.rightDown = false;
    }

    /**
     * depending on conditions add/remove "flag" or "question" and disable/enable stubCell
     */
    addFlagOrQuestion(): void {
        if (!this.flagOrQuestion.enabled) {
            return;
        }

        if (!this.flagOrQuestion.visible) {
            this.fireEvent("flagAdded");
            this.flagOrQuestion.visible = true;
            this.stubCell.enabled = false;

        } else if (this.flagOrQuestion.type === "flag") {
            this.flagOrQuestion.changeType();
            this.fireEvent("flagRemoved");

        } else {
            this.flagOrQuestion.visible = false;
            this.stubCell.enabled = true;
            this.flagOrQuestion.changeType();
        }
    }

    /**
     * open all neighboring cells which not opened yet
     */
    openNeighbors() {
        this.neighbors.forEach(neighbor => {
            if (!neighbor.opened) {
                neighbor.open();
            }
        });
    }

    /**
     * add mine and make plus one to cell.number of neighboring cells
     */
    addMine() {
        this.type = "mine";
        this.number.hide();
        this.mine.show();
        this.neighbors.forEach(neighbor => {
            neighbor.addOne();
        });
    }

    /**
     * if conditions are met add plus one to cell.number
     */
    addOne() {
        if (this.type !== "mine") {
            this.number.addOne();
            if (this.type !== "start") {
                this.type = "number";
            }
        }
    }

    /**
     * removes interactive
     */
    removeInteractive() {
        this.interactive = false;
    }

    getFlaggedNeighborsNum(): number {
        let num = 0;
        this.neighbors.forEach(neighbor => {
            if (!neighbor.stubCell.enabled) {
                num++;
            }
        });

        return num;
    }
}
