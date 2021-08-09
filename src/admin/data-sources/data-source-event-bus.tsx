import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {DataSourceEventBus} from './data-source-event-bus-types';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '../widgets/tuple-workbench/tuple-event-bus-types';

const Context = React.createContext<DataSourceEventBus>({} as DataSourceEventBus);
Context.displayName = 'DataSourceEventBus';

export const DataSourceEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	const {fire} = useTupleEventBus();
	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<DataSourceEventBus>({
		fire: (type: string, ...data: Array<any>): DataSourceEventBus => {
			fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): DataSourceEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into DataSource event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): DataSourceEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useDataSourceEventBus = () => useContext(Context);
