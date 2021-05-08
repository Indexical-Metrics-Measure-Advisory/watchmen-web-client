import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {CatalogEventBus} from './catalog-event-bus-types';

const Context = React.createContext<CatalogEventBus>({} as CatalogEventBus);
Context.displayName = 'CatalogEventBus';

export const CatalogEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
    const {children} = props;

    const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
    const [bus] = useState<CatalogEventBus>({
        fire: (type: string, ...data: any): CatalogEventBus => {
            emitter.emit(type, ...data);
            return bus;
        },
        on: (type: string, listener: (...data: any) => void): CatalogEventBus => {
            if (emitter.rawListeners(type).includes(listener)) {
                console.error(`Listener on [${type}] was added into catalog event bus, check it.`);
            }
            emitter.on(type, listener);
            return bus;
        },
        off: (type: string, listener: (...data: any) => void): CatalogEventBus => {
            emitter.off(type, listener);
            return bus;
        }
    });

    return <Context.Provider value={bus}>
        {children}
    </Context.Provider>;
};

export const useCatalogEventBus = () => useContext(Context);
