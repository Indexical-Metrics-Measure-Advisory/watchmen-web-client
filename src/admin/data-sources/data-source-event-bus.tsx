import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode, useContext} from 'react';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {DataSourceEventBus} from './data-source-event-bus-types';

const Context = React.createContext<DataSourceEventBus>({} as DataSourceEventBus);
Context.displayName = 'DataSourceEventBus';

export const DataSourceEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const {fire} = useTupleEventBus();
	const bus = useCreateEventBus<DataSourceEventBus>('data source', {
		beforeFire: () => fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED)
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useDataSourceEventBus = () => useContext(Context);
