import {events} from "./events";

export const observableMixin: {by: Function, fireEvent: Function} = {
    /**
     *
     * @param {object} params {Object.<string, function>}
     */
    by : function (params: object): void {
        if( !this.eventHandlers ){
            this.eventHandlers = {};
        }

        for( let eventName in params) {
            if( params.hasOwnProperty(eventName) ) {
                if ( !this.eventHandlers[eventName]){
                    events.addListener(eventName, this);
                }
                this.eventHandlers[eventName] = params[eventName] ;
            }
        }
    },

    /**
     *
     * @param {string} eventName eventName
     * @param {array} args array with arguments
     */
    fireEvent : function(eventName: string, ...args : any[]){
        events.fireEvent(eventName, args);
    }
};