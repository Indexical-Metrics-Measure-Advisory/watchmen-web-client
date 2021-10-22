import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {SpaceEventBus} from './space-event-bus-types';

const Context = React.createContext<SpaceEventBus>({} as SpaceEventBus);
Context.displayName = 'SpaceEventBus';

export const SpaceEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<SpaceEventBus>({
		fire: (type: string, ...data: Array<any>): SpaceEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): SpaceEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into space event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): SpaceEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useSpaceEventBus = () => useContext(Context);
