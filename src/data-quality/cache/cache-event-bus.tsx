import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {DataQualityCacheEventBus} from './cache-event-bus-types';

const Context = React.createContext<DataQualityCacheEventBus>({} as DataQualityCacheEventBus);
Context.displayName = 'CacheEventBus';

export const DataQualityCacheEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<DataQualityCacheEventBus>({
		fire: (type: string, ...data: Array<any>): DataQualityCacheEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: Array<any>) => void): DataQualityCacheEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): DataQualityCacheEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into data quality cache event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): DataQualityCacheEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useDataQualityCacheEventBus = () => useContext(Context);
