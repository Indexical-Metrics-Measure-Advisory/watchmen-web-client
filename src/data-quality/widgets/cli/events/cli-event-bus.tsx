import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {CliEventBus} from './cli-event-bus-types';

const Context = React.createContext<CliEventBus>({} as CliEventBus);
Context.displayName = 'CliEventBus';

export const CliEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<CliEventBus>({
		fire: (type: string, ...data: Array<any>): CliEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): CliEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into cli event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): CliEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useCliEventBus = () => useContext(Context);
