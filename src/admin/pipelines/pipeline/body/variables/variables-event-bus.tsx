import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {VariablesEventBus} from './variables-event-bus-types';

const Context = React.createContext<VariablesEventBus>({} as VariablesEventBus);
Context.displayName = 'VariablesEventBus';

export const VariablesEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<VariablesEventBus>({
		fire: (type: string, ...data: Array<any>): VariablesEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: Array<any>) => void): VariablesEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): VariablesEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into variables event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): VariablesEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useVariablesEventBus = () => useContext(Context);
