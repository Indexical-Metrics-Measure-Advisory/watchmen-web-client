import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {PipelinesEventBus} from './pipelines-event-bus-types';

const Context = createContext<PipelinesEventBus>({} as PipelinesEventBus);
Context.displayName = 'PipelinesEventBus';

export const PipelinesEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<PipelinesEventBus>('pipelines');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const usePipelinesEventBus = () => useContext(Context);
