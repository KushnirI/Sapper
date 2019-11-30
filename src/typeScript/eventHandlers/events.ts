import {ObservableMixin} from "./observableMixin";

export const events: {
    events: {[eventName: string]: Array<{eventHandlers: ObservableMixin["eventHandlers"]}>},
    addListener: (eventName: string, eventListener: object) => void,
    fireEvent: (eventName: string, args: any[]) => void,
} = {

    events: {},

    /**
     *
     * @param {string} eventName Name of event
     * @param {object} eventListener object with callback function, which should be called on event
     */
    addListener (eventName: string, eventListener: object): void {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(eventListener);
    },

    /**
     *
     * @param {string} eventName Name of event
     * @param {array} args arguments for callback function
     */
    fireEvent(eventName: string, args: any[]): void {
        const listeners = this.events[eventName];

        for (const listener of listeners) {
            const handler = listener.eventHandlers[eventName];

            handler.apply(listener, args);
        }
    },
};
