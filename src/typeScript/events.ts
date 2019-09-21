export const events: {events:{}, addListener: Function, fireEvent: Function} = {

    events : {},

    /**
     *
     * @param {string} eventName Name of event
     * @param {object} eventListener object with callback function, which should be called on event
     */
    addListener : function(eventName: string, eventListener: object):void {
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(eventListener);
    },

    /**
     *
     * @param {string} eventName Name of event
     * @param {array} args arguments for callback function
     */
    fireEvent : function (eventName: string, args: any[]){
        const listeners = this.events[eventName];

        for(let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            const handler = listener.eventHandlers[eventName];

            handler.apply(listener, args)
        }

    }
};