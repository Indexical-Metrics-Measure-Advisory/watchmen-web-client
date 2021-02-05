import EventEmitter from 'events';
import React, { useContext, useState } from 'react';
import { SubjectEventBus } from './subject-event-bus-types';

const Context = React.createContext<SubjectEventBus>({} as SubjectEventBus);
Context.displayName = 'SubjectEventBus';

export const SubjectEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { children } = props;

	const [ emitter ] = useState(new EventEmitter().setMaxListeners(999999));
	const [ bus ] = useState<SubjectEventBus>({
		fire: (type: string, ...data: any): SubjectEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): SubjectEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into subject event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): SubjectEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useSubjectEventBus = () => useContext(Context);
