import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {ReportEventBus} from './report-event-bus-types';

const Context = React.createContext<ReportEventBus>({} as ReportEventBus);
Context.displayName = 'ReportEventBus';

export const ReportEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
    const {children} = props;

    const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
    const [bus] = useState<ReportEventBus>({
        fire: (type: string, ...data: any): ReportEventBus => {
            emitter.emit(type, ...data);
            return bus;
        },
        on: (type: string, listener: (...data: any) => void): ReportEventBus => {
            if (emitter.rawListeners(type).includes(listener)) {
                console.error(`Listener on [${type}] was added into report event bus, check it.`);
            }
            emitter.on(type, listener);
            return bus;
        },
        off: (type: string, listener: (...data: any) => void): ReportEventBus => {
            emitter.off(type, listener);
            return bus;
        }
    });

    return <Context.Provider value={bus}>
        {children}
    </Context.Provider>;
};

export const useReportEventBus = () => useContext(Context);
