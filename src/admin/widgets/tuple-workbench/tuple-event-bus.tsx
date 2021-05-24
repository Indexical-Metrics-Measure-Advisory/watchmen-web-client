import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {TupleEventBus} from './tuple-event-bus-types';

const Context = React.createContext<TupleEventBus>({} as TupleEventBus);
Context.displayName = 'TupleEventBus';

export const TupleEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<TupleEventBus>({
		fire: (type: string, ...data: Array<any>): TupleEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: Array<any>) => void): TupleEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): TupleEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into tuple event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): TupleEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useTupleEventBus = () => useContext(Context);
