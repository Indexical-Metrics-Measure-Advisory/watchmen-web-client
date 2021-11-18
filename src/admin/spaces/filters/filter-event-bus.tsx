import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {FilterEventBus} from './filter-event-bus-types';

const Context = createContext<FilterEventBus>({} as FilterEventBus);
Context.displayName = 'FilterEventBus';

export const FilterEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<FilterEventBus>('filter');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useFilterEventBus = () => useContext(Context);
