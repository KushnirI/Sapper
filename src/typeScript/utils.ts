/**
 * creates random integer value between min and max
 * @param {number} min min possible value
 * @param {number} max max possible value
 * @returns {number}
 */
export function randomInt(min: number, max: number):number {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}