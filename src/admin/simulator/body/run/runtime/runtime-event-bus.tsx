import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {RuntimeEventBus} from './runtime-event-bus-types';

const Context = React.createContext<RuntimeEventBus>({} as RuntimeEventBus);
Context.displayName = 'RuntimeEventBus';

export const RuntimeEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<RuntimeEventBus>({
		fire: (type: string, ...data: Array<any>): RuntimeEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): RuntimeEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into runtime event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): RuntimeEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useRuntimeEventBus = () => useContext(Context);
