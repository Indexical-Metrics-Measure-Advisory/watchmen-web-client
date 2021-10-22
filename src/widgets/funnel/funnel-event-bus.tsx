import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {FunnelEventBus} from './funnel-event-bus-types';

const Context = React.createContext<FunnelEventBus>({} as FunnelEventBus);
Context.displayName = 'FunnelEventBus';

export const FunnelEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<FunnelEventBus>({
		fire: (type: string, ...data: Array<any>): FunnelEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: Array<any>) => void): FunnelEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): FunnelEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into funnel event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): FunnelEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useFunnelEventBus = () => useContext(Context);
