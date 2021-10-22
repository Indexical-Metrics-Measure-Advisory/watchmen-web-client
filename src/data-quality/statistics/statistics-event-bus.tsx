import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {StatisticsEventBus} from './statistics-event-bus-types';

const Context = React.createContext<StatisticsEventBus>({} as StatisticsEventBus);
Context.displayName = 'StatisticsEventBus';

export const StatisticsEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<StatisticsEventBus>({
		fire: (type: string, ...data: Array<any>): StatisticsEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): StatisticsEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into rules event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): StatisticsEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useStatisticsEventBus = () => useContext(Context);
