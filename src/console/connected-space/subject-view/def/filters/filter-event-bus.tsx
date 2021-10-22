import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {FilterEventBus} from './filter-event-bus-types';

const Context = React.createContext<FilterEventBus>({} as FilterEventBus);
Context.displayName = 'FilterEventBus';

export const FilterEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<FilterEventBus>({
		fire: (type: string, ...data: Array<any>): FilterEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): FilterEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into filter event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): FilterEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useFilterEventBus = () => useContext(Context);
