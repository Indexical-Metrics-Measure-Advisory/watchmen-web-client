import EventEmitter from 'events';
import React, { useContext, useState } from 'react';
import { EventBus } from './types';

const Context = React.createContext<EventBus>({} as EventBus);
Context.displayName = 'EventBus';

export const EventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { children } = props;

	const [ emitter ] = useState(new EventEmitter().setMaxListeners(999999));
	const [ bus ] = useState<EventBus>({
		fire: (type: string, ...data: any): EventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: any) => void): EventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): EventBus => {
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): EventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useEventBus = () => useContext(Context);
