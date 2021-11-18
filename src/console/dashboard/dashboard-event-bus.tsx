import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {DashboardEventBus} from './dashboard-event-bus-types';

const Context = createContext<DashboardEventBus>({} as DashboardEventBus);
Context.displayName = 'DashboardEventBus';

export const DashboardEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<DashboardEventBus>('dashboard');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useDashboardEventBus = () => useContext(Context);
