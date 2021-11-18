import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {SpaceEventBus} from './space-event-bus-types';

const Context = createContext<SpaceEventBus>({} as SpaceEventBus);
Context.displayName = 'SpaceEventBus';

export const SpaceEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<SpaceEventBus>('space');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useSpaceEventBus = () => useContext(Context);
