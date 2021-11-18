import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {RuntimeEventBus} from './runtime-event-bus-types';

const Context = createContext<RuntimeEventBus>({} as RuntimeEventBus);
Context.displayName = 'RuntimeEventBus';

export const RuntimeEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<RuntimeEventBus>('runtime');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useRuntimeEventBus = () => useContext(Context);
