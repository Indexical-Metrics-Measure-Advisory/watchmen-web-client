import EventEmitter from 'events';
import React, { useContext, useState } from 'react';
import { ConsoleEventBus } from './console-event-bus-types';

const Context = React.createContext<ConsoleEventBus>({} as ConsoleEventBus);
Context.displayName = 'ConsoleEventBus';

export const ConsoleEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { children } = props;

	const [ emitter ] = useState(new EventEmitter().setMaxListeners(999999));
	const [ bus ] = useState<ConsoleEventBus>({
		fire: (type: string, ...data: any): ConsoleEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: any) => void): ConsoleEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): ConsoleEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): ConsoleEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useConsoleEventBus = () => useContext(Context);
