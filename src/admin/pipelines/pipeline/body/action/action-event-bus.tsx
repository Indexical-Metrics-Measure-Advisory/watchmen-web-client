import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {ActionEventBus} from './action-event-bus-types';

const Context = React.createContext<ActionEventBus>({} as ActionEventBus);
Context.displayName = 'ActionEventBus';

export const ActionEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<ActionEventBus>({
		fire: (type: string, ...data: Array<any>): ActionEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): ActionEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into action event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): ActionEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useActionEventBus = () => useContext(Context);
