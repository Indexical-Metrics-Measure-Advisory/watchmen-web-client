import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {ConnectedSpaceEventBus} from './connected-space-event-bus-types';

const Context = React.createContext<ConnectedSpaceEventBus>({} as ConnectedSpaceEventBus);
Context.displayName = 'ConnectedSpaceEventBus';

export const ConnectedSpaceEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<ConnectedSpaceEventBus>({
		fire: (type: string, ...data: Array<any>): ConnectedSpaceEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): ConnectedSpaceEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into connected space event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): ConnectedSpaceEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useConnectedSpaceEventBus = () => useContext(Context);
