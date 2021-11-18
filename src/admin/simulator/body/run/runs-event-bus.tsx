import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {RunsEventBus} from './runs-event-bus-types';

const Context = createContext<RunsEventBus>({} as RunsEventBus);
Context.displayName = 'RunsEventBus';

export const RunsEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<RunsEventBus>('runs');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useRunsEventBus = () => useContext(Context);
