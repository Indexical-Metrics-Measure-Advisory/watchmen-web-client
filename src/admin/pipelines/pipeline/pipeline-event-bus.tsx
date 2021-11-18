import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {PipelineEventBus} from './pipeline-event-bus-types';

const Context = createContext<PipelineEventBus>({} as PipelineEventBus);
Context.displayName = 'PipelineEventBus';

export const PipelineEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<PipelineEventBus>('pipeline');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const usePipelineEventBus = () => useContext(Context);
