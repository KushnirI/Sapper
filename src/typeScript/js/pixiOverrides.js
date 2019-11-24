//saving original PIXI method
const defaultNormalizeToPointerData = PIXI.interaction.InteractionManager.prototype.normalizeToPointerData;
/**
 Processing of two mouse buttons at the same time is required for the game.
 By default in PIXI, while one of the mouse buttons is pressed, hitting on
 the other button will be processed as mouseEvent but not as a pointerDown,
 but this event can be intercepted and used as pointerDown.
 @param {Object} event mouse event
 @returns {Object} normalizedEvent
 */
PIXI.interaction.InteractionManager.prototype.normalizeToPointerData = function normalizeToPointerData(event) {

    // to prevent stack overflow if event already normalized it has to be returned
    if(event.normalizedAlready){
        return event;
    }

    // interception of pointerDown event by property that other mouse events don't have yet
    let isPointerDown = event.pressure === 0.5;

    // use original PIXI method to normalize event to pointer data;
    let normalizedEvent = defaultNormalizeToPointerData.apply(this, arguments);

    if(isPointerDown){
        // add normalizedAlready property to be able to distinguish already normalized properties
        normalizedEvent.normalizedAlready = true;
        this.onPointerDown(normalizedEvent);
    }

    return normalizedEvent;
};

