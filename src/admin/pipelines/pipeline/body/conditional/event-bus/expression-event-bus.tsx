import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {ExpressionEventBus} from './expression-event-bus-types';

const Context = React.createContext<ExpressionEventBus>({} as ExpressionEventBus);
Context.displayName = 'ExpressionEventBus';

export const ExpressionEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<ExpressionEventBus>({
		fire: (type: string, ...data: Array<any>): ExpressionEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): ExpressionEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into expression event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): ExpressionEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useExpressionEventBus = () => useContext(Context);
