import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {StatisticsEventBus} from './statistics-event-bus-types';

const Context = createContext<StatisticsEventBus>({} as StatisticsEventBus);
Context.displayName = 'StatisticsEventBus';

export const StatisticsEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<StatisticsEventBus>('statistics');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useStatisticsEventBus = () => useContext(Context);
