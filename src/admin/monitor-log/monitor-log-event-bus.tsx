import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {MonitorLogEventBus} from './monitor-log-event-bus-types';

const Context = createContext<MonitorLogEventBus>({} as MonitorLogEventBus);
Context.displayName = 'MonitorLogEventBus';

export const MonitorLogEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<MonitorLogEventBus>('monitor log');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useMonitorLogEventBus = () => useContext(Context);
