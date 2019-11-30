import {events} from "./events";

export interface ObservableMixin {
    by: (params: {[key: string]: (...args: any[]) => void}) => void;
    fireEvent: (eventName: string, ...args: any[]) => void;
    eventHandlers?: {[eventName: string]: () => void};
}

export const observableMixin: ObservableMixin = {
    /**
     *
     * @param {object} params {Object.<string, function>}
     */
    by (params: {[key: string]: (...args: any[]) => void}): void {
        if (!this.eventHandlers) {
            this.eventHandlers = {};
        }

        for (const eventName in params) {
            if (params.hasOwnProperty(eventName)) {
                if (!this.eventHandlers[eventName]) {
                    events.addListener(eventName, this);
                }
                this.eventHandlers[eventName] = params[eventName];
            }
        }
    },

    /**
     *
     * @param {string} eventName eventName
     * @param {array} args array with arguments
     */
    fireEvent (eventName: string, ...args: any[]): void {
        events.fireEvent(eventName, args);
    },
};
