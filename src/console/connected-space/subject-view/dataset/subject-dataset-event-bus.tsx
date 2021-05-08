import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {SubjectDataSetEventBus} from './subject-dataset-event-bus-types';

const Context = React.createContext<SubjectDataSetEventBus>({} as SubjectDataSetEventBus);
Context.displayName = 'SubjectDataSetEventBus';

export const SubjectDataSetEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<SubjectDataSetEventBus>({
		fire: (type: string, ...data: any): SubjectDataSetEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: any) => void): SubjectDataSetEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): SubjectDataSetEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into subject data event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): SubjectDataSetEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useSubjectDataSetEventBus = () => useContext(Context);
