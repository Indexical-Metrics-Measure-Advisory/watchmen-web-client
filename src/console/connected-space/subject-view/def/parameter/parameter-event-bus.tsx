import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {ParameterEventBus, ParameterEventTypes} from './parameter-event-bus-types';

const Context = React.createContext<ParameterEventBus>({} as ParameterEventBus);
Context.displayName = 'ParameterEventBus';

export const ParameterEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<ParameterEventBus>({
		fire: (type: string, ...data: any): ParameterEventBus => {
			emitter.emit(type, ...data);
			emitter.emit(ParameterEventTypes.PARAM_CHANGED);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): ParameterEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into parameter event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): ParameterEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useParameterEventBus = () => useContext(Context);
