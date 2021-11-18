import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {JoinEventBus} from './join-event-bus-types';

const Context = createContext<JoinEventBus>({} as JoinEventBus);
Context.displayName = 'JoinEventBus';

export const JoinEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<JoinEventBus>('join');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useJoinEventBus = () => useContext(Context);
