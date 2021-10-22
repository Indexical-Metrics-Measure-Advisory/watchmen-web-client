import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {ColumnEventBus} from './column-event-bus-types';

const Context = React.createContext<ColumnEventBus>({} as ColumnEventBus);
Context.displayName = 'ColumnEventBus';

export const ColumnEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<ColumnEventBus>({
		fire: (type: string, ...data: Array<any>): ColumnEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): ColumnEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into column event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): ColumnEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useColumnEventBus = () => useContext(Context);
