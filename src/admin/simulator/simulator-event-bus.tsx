import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {SimulatorEventBus} from './simulator-event-bus-types';

const Context = React.createContext<SimulatorEventBus>({} as SimulatorEventBus);
Context.displayName = 'SimulatorEventBus';

export const SimulatorEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<SimulatorEventBus>({
		fire: (type: string, ...data: Array<any>): SimulatorEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: Array<any>) => void): SimulatorEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): SimulatorEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into simulator event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): SimulatorEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useSimulatorEventBus = () => useContext(Context);
