import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {RunsEventBus} from './runs-event-bus-types';

const Context = React.createContext<RunsEventBus>({} as RunsEventBus);
Context.displayName = 'RunsEventBus';

export const RunsEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<RunsEventBus>({
		fire: (type: string, ...data: Array<any>): RunsEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: Array<any>) => void): RunsEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): RunsEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into runs event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): RunsEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useRunsEventBus = () => useContext(Context);
