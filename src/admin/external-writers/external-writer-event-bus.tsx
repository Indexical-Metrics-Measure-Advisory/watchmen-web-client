import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {ExternalWriterEventBus} from './external-writer-event-bus-types';

const Context = React.createContext<ExternalWriterEventBus>({} as ExternalWriterEventBus);
Context.displayName = 'ExternalWriterEventBus';

export const ExternalWriterEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const {fire} = useTupleEventBus();
	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<ExternalWriterEventBus>({
		fire: (type: string, ...data: Array<any>): ExternalWriterEventBus => {
			fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): ExternalWriterEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into external writer event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): ExternalWriterEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useExternalWriterEventBus = () => useContext(Context);
