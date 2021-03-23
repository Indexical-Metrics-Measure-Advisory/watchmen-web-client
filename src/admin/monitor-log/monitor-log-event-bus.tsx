import EventEmitter from 'events';
import React, { useContext, useState } from 'react';
import { MonitorLogEventBus } from './monitor-log-event-bus-types';

const Context = React.createContext<MonitorLogEventBus>({} as MonitorLogEventBus);
Context.displayName = 'MonitorLogEventBus';

export const MonitorLogEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { children } = props;

	const [ emitter ] = useState(new EventEmitter().setMaxListeners(999999));
	const [ bus ] = useState<MonitorLogEventBus>({
		fire: (type: string, ...data: any): MonitorLogEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): MonitorLogEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into monitor log event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): MonitorLogEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useMonitorLogEventBus = () => useContext(Context);
