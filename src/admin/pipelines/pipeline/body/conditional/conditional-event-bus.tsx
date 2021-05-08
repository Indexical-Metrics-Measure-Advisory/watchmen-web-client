import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {ConditionalEventBus} from './conditional-event-bus-types';

const Context = React.createContext<ConditionalEventBus>({} as ConditionalEventBus);
Context.displayName = 'ConditionalEventBus';

export const ConditionalEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
    const {children} = props;

    const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
    const [bus] = useState<ConditionalEventBus>({
        fire: (type: string, ...data: any): ConditionalEventBus => {
            emitter.emit(type, ...data);
            return bus;
        },
        on: (type: string, listener: (...data: any) => void): ConditionalEventBus => {
            if (emitter.rawListeners(type).includes(listener)) {
                console.error(`Listener on [${type}] was added into conditional event bus, check it.`);
            }
            emitter.on(type, listener);
            return bus;
        },
        off: (type: string, listener: (...data: any) => void): ConditionalEventBus => {
            emitter.off(type, listener);
            return bus;
        }
    });

    return <Context.Provider value={bus}>
        {children}
    </Context.Provider>;
};

export const useConditionalEventBus = () => useContext(Context);
