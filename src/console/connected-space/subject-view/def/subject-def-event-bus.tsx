import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {SubjectDefEventBus} from './subject-def-event-bus-types';

const Context = React.createContext<SubjectDefEventBus>({} as SubjectDefEventBus);
Context.displayName = 'SubjectDefEventBus';

export const SubjectDefEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<SubjectDefEventBus>({
		fire: (type: string, ...data: any): SubjectDefEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: any) => void): SubjectDefEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): SubjectDefEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into subject definition event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): SubjectDefEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useSubjectDefEventBus = () => useContext(Context);
