import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {RulesEventBus} from './rules-event-bus-types';

const Context = React.createContext<RulesEventBus>({} as RulesEventBus);
Context.displayName = 'RulesEventBus';

export const RulesEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<RulesEventBus>({
		fire: (type: string, ...data: Array<any>): RulesEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: Array<any>) => void): RulesEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): RulesEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into rules event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): RulesEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useRulesEventBus = () => useContext(Context);
