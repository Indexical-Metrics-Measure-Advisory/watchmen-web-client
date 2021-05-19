import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {RunsEventBus} from './runs-event-bus-types';

const Context = React.createContext<RunsEventBus>({} as RunsEventBus);
Context.displayName = 'RunsEventBus';

export const RunsEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<RunsEventBus>({
		fire: (type: string, ...data: any): RunsEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): RunsEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into runs event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): RunsEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useRunsEventBus = () => useContext(Context);