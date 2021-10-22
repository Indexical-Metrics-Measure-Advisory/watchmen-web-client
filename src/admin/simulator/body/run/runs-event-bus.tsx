import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode, useContext} from 'react';
import {RunsEventBus} from './runs-event-bus-types';

const Context = React.createContext<RunsEventBus>({} as RunsEventBus);
Context.displayName = 'RunsEventBus';

export const RunsEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<RunsEventBus>('runs');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useRunsEventBus = () => useContext(Context);
