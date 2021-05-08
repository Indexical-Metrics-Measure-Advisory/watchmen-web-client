import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {TupleItemPickerEventBus} from './tuple-item-picker-event-bus-types';

const Context = React.createContext<TupleItemPickerEventBus>({} as TupleItemPickerEventBus);
Context.displayName = 'TupleItemPickerEventBus';

export const TupleItemPickerEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
    const {children} = props;

    const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
    const [bus] = useState<TupleItemPickerEventBus>({
        fire: (type: string, ...data: any): TupleItemPickerEventBus => {
            emitter.emit(type, ...data);
            return bus;
        },
        on: (type: string, listener: (...data: any) => void): TupleItemPickerEventBus => {
            if (emitter.rawListeners(type).includes(listener)) {
                console.error(`Listener on [${type}] was added into tuple item picker event bus, check it.`);
            }
            emitter.on(type, listener);
            return bus;
        },
        off: (type: string, listener: (...data: any) => void): TupleItemPickerEventBus => {
            emitter.off(type, listener);
            return bus;
        }
    });

    return <Context.Provider value={bus}>
        {children}
    </Context.Provider>;
};

export const useTupleItemPickerEventBus = () => useContext(Context);
