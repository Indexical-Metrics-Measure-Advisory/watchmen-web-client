import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {UnitEventBus} from './unit-event-bus-types';

const Context = React.createContext<UnitEventBus>({} as UnitEventBus);
Context.displayName = 'UnitEventBus';

export const UnitEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<UnitEventBus>({
		fire: (type: string, ...data: Array<any>): UnitEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): UnitEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into unit event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): UnitEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useUnitEventBus = () => useContext(Context);
