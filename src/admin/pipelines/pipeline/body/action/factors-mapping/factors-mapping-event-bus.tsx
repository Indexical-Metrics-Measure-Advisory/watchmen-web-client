import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {FactorsMappingEventBus} from './factors-mapping-event-bus-types';

const Context = React.createContext<FactorsMappingEventBus>({} as FactorsMappingEventBus);
Context.displayName = 'FactorsMappingEventBus';

export const FactorsMappingEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<FactorsMappingEventBus>({
		fire: (type: string, ...data: any): FactorsMappingEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): FactorsMappingEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into factors mapping event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): FactorsMappingEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useFactorsMappingEventBus = () => useContext(Context);
