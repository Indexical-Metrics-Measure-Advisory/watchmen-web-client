import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {ConnectedSpaceEventBus} from './connected-space-event-bus-types';

const Context = createContext<ConnectedSpaceEventBus>({} as ConnectedSpaceEventBus);
Context.displayName = 'ConnectedSpaceEventBus';

export const ConnectedSpaceEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ConnectedSpaceEventBus>('connected space');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useConnectedSpaceEventBus = () => useContext(Context);
