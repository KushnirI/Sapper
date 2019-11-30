/**
 * creates random integer value between min and max
 * @param {number} min min possible value
 * @param {number} max max possible value
 * @returns {number}
 */
export function randomInt(min: number, max: number): number {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

/**
 * scale canvas to window size
 * @param {Object} canvas
 */
export function scaleToWindow(canvas) {
    const scaleX = window.innerWidth / canvas.offsetWidth;
    const scaleY = window.innerHeight / canvas.offsetHeight;
    const scale = Math.min(scaleX, scaleY);

    canvas.style.transformOrigin = "0 0";
    canvas.style.transform = "scale(" + scale + ")";
}
