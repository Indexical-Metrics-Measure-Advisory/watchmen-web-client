import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {JoinEventBus} from './join-event-bus-types';

const Context = React.createContext<JoinEventBus>({} as JoinEventBus);
Context.displayName = 'JoinEventBus';

export const JoinEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
    const {children} = props;

    const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
    const [bus] = useState<JoinEventBus>({
        fire: (type: string, ...data: any): JoinEventBus => {
            emitter.emit(type, ...data);
            return bus;
        },
        on: (type: string, listener: (...data: any) => void): JoinEventBus => {
            if (emitter.rawListeners(type).includes(listener)) {
                console.error(`Listener on [${type}] was added into join event bus, check it.`);
            }
            emitter.on(type, listener);
            return bus;
        },
        off: (type: string, listener: (...data: any) => void): JoinEventBus => {
            emitter.off(type, listener);
            return bus;
        }
    });

    return <Context.Provider value={bus}>
        {children}
    </Context.Provider>;
};

export const useJoinEventBus = () => useContext(Context);
