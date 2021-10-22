import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {AdminCacheEventBus} from './cache-event-bus-types';

const Context = React.createContext<AdminCacheEventBus>({} as AdminCacheEventBus);
Context.displayName = 'CacheEventBus';

export const AdminCacheEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<AdminCacheEventBus>({
		fire: (type: string, ...data: Array<any>): AdminCacheEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: Array<any>) => void): AdminCacheEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): AdminCacheEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into admin cache event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): AdminCacheEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useAdminCacheEventBus = () => useContext(Context);
