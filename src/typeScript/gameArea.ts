import {config} from "./config";
import {Rectangle} from "./utils/rectangle";
import {app} from "./index";
import {Cell} from "./cell/cell";
import {randomInt} from "./utils/utils";
import {ObservableMixin, observableMixin} from "./eventHandlers/observableMixin";

export interface GameArea extends PIXI.Container, ObservableMixin {
    area: Rectangle;
    cells: Cell[][];
    mines: Cell[];
    availableCellsCount: number;
}

export class GameArea extends PIXI.Container {
    constructor(x: number, y: number) {
        super();

        Object.assign(this, observableMixin);

        this.area = new Rectangle(0, 0, config.gameArea.width, config.gameArea.height);
        this.cells = this.addCells(config.rows, config.columns, config.fieldSize.width, config.fieldSize.height);

        this.defineNeighboringCells(this.cells);

        this.by({
            firstMove: this.addMines,
            explosion: this.gameOver,
            cellOpened: this.updateAvailableCellsCount,
        });

        this.availableCellsCount = config.rows * config.columns - config.minesAmount;
        this.position.set(x, y);
        this.addChild(this.area);
        app.stage.addChild(this);
    }

    /**
     * add cells to 2d array
     * @param {Number} rows amount of rows
     * @param {Number} columns amount of columns
     * @param {Number} width cell's width
     * @param {Number} height cell's height
     * @returns {Array} 2d array of Cells
     */
    addCells(rows: number, columns: number, width: number, height: number): Cell[][] {
        const arr2D: Cell[][] = [];
        const x = width / 2;
        const y = height / 2;

        for (let i = 0; i < rows; i++) {

            const arr: Cell[] = [];
            for (let j = 0; j < columns; j++) {
                const cell = new Cell(x + width * j, y + height * i, width, height);
                arr.push(this.addChild(cell));
            }
            arr2D.push(arr);
        }

        return arr2D;
    }

    /**
     * For each cell define and add to cell.neighbors arr, neighboring cells
     * @param {Array} arr2D 2d array of cells
     */
    defineNeighboringCells(arr2D: Cell[][]): void {
        for (let i = 0; i < arr2D.length; i++) {

            let insideArr: Cell[];
            let previousArr: Cell[];
            let nextArr: Cell[];

            if (arr2D[i - 1]) {
                previousArr = arr2D[i - 1];
            }

            if (arr2D[i + 1]) {
                nextArr = arr2D[i + 1];
            }

            insideArr = arr2D[i];

            for (let j = 0; j < insideArr.length; j++) {
                const curFiled: Cell = insideArr[j];
                let lineBefore: Cell;
                let lineAfter: Cell;

                if (insideArr[j - 1]) {
                    lineBefore = insideArr[j - 1];
                }
                if (insideArr[j + 1]) {
                    lineAfter = insideArr[j + 1];
                }

                if (previousArr) {
                    if (lineBefore) {
                        curFiled.neighbors.push(previousArr[j - 1]);
                    }
                    if (lineAfter) {
                        curFiled.neighbors.push(previousArr[j + 1]);
                    }
                    curFiled.neighbors.push(previousArr[j]);
                }

                if (nextArr) {
                    if (lineBefore) {
                        curFiled.neighbors.push(nextArr[j - 1]);
                    }
                    if (lineAfter) {
                        curFiled.neighbors.push(nextArr[j + 1]);
                    }
                    curFiled.neighbors.push(nextArr[j]);
                }

                if (lineBefore) {
                    curFiled.neighbors.push(insideArr[j - 1]);
                }
                if (lineAfter) {
                    curFiled.neighbors.push(insideArr[j + 1]);
                }
            }
        }
    }

    /**
     * randomly add mines to cells in cells array
     * @param {Number} minesAmount amount of mines
     */
    addMines(minesAmount: number): void {
        const mines: Cell[] = [];

        for (let i = 0; i < minesAmount; i++) {
            const row = randomInt(0, config.rows - 1);
            const column = randomInt(0, config.columns - 1);
            const cell = this.cells[row][column];

            if (!["mine", "start"].includes(cell.type)) {
                cell.addMine();
                mines.push(cell);
            } else {
                i--;
            }
        }

        this.mines = mines;
    }

    /**
     * on event "cellOpened" deduct availableCellsCount
     * if no more availableFiled left, fire event "victory"
     */
    updateAvailableCellsCount(): void {
        this.availableCellsCount--;

        if (this.availableCellsCount === 0) {
            this.fireEvent("victory");
            this.removeInteractiveAll();
        }
    }

    /**
     * shows all mines and remove cells interactiveness (the game is lost)
     */
    gameOver(): void {
        this.explosion();
        this.removeInteractiveAll();
    }

    /**
     * shows all mines
     */
    explosion(): void {
        this.mines.forEach(cell => {
            cell.flagOrQuestion.visible = false;
            cell.type = "exploded";
            cell.stubCell.open();
        });
    }

    /**
     * remove cells interactive
     */
    removeInteractiveAll(): void {
        this.cells.forEach(arr => {
            arr.forEach(cell => {
                cell.removeInteractive();
            });
        });
    }
}
