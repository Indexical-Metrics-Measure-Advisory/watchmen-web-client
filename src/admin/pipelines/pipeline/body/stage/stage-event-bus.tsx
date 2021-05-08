import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {StageEventBus} from './stage-event-bus-types';

const Context = React.createContext<StageEventBus>({} as StageEventBus);
Context.displayName = 'StageEventBus';

export const StageEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<StageEventBus>({
		fire: (type: string, ...data: any): StageEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): StageEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into stage event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): StageEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useStageEventBus = () => useContext(Context);
