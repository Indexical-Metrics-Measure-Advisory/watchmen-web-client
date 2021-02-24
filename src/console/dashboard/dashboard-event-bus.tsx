import EventEmitter from 'events';
import React, { useContext, useState } from 'react';
import { DashboardEventBus } from './dashboard-event-bus-types';

const Context = React.createContext<DashboardEventBus>({} as DashboardEventBus);
Context.displayName = 'DashboardEventBus';

export const DashboardEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { children } = props;

	const [ emitter ] = useState(new EventEmitter().setMaxListeners(999999));
	const [ bus ] = useState<DashboardEventBus>({
		fire: (type: string, ...data: any): DashboardEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): DashboardEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into dashboard event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): DashboardEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useDashboardEventBus = () => useContext(Context);
