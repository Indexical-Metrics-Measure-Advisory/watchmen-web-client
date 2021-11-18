import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {StageEventBus} from './stage-event-bus-types';

const Context = createContext<StageEventBus>({} as StageEventBus);
Context.displayName = 'StageEventBus';

export const StageEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<StageEventBus>('stage');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useStageEventBus = () => useContext(Context);
