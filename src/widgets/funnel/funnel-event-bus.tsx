import React, {createContext, ReactNode, useContext} from 'react';
import {useCreateEventBus} from '../events/use-create-event-bus';
import {FunnelEventBus} from './funnel-event-bus-types';

const Context = createContext<FunnelEventBus>({} as FunnelEventBus);
Context.displayName = 'FunnelEventBus';

export const FunnelEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<FunnelEventBus>('funnel');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useFunnelEventBus = () => useContext(Context);
