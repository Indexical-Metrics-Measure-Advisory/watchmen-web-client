import EventEmitter from 'events';
import React, { useContext, useState } from 'react';
import { PipelinesEventBus } from './pipelines-event-bus-types';

const Context = React.createContext<PipelinesEventBus>({} as PipelinesEventBus);
Context.displayName = 'PipelinesEventBus';

export const PipelinesEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { children } = props;

	const [ emitter ] = useState(new EventEmitter().setMaxListeners(999999));
	const [ bus ] = useState<PipelinesEventBus>({
		fire: (type: string, ...data: any): PipelinesEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: any) => void): PipelinesEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): PipelinesEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into pipelines event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): PipelinesEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const usePipelinesEventBus = () => useContext(Context);
