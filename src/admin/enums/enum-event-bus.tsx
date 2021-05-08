import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {EnumEventBus, EnumEventTypes} from './enum-event-bus-types';

const Context = React.createContext<EnumEventBus>({} as EnumEventBus);
Context.displayName = 'EnumEventBus';

export const EnumEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
    const {children} = props;

    const {fire} = useTupleEventBus();
    const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
    const [bus] = useState<EnumEventBus>({
        fire: (type: string, ...data: any): EnumEventBus => {
            if (type !== EnumEventTypes.ITEM_SEARCH_TEXT_CHANGED) {
                fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
            }
            emitter.emit(type, ...data);
            return bus;
        },
        on: (type: string, listener: (...data: any) => void): EnumEventBus => {
            if (emitter.rawListeners(type).includes(listener)) {
                console.error(`Listener on [${type}] was added into enum event bus, check it.`);
            }
            emitter.on(type, listener);
            return bus;
        },
        off: (type: string, listener: (...data: any) => void): EnumEventBus => {
            emitter.off(type, listener);
            return bus;
        }
    });

    return <Context.Provider value={bus}>
        {children}
    </Context.Provider>;
};

export const useEnumEventBus = () => useContext(Context);
