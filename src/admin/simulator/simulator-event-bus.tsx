import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {SimulatorEventBus} from './simulator-event-bus-types';

const Context = createContext<SimulatorEventBus>({} as SimulatorEventBus);
Context.displayName = 'SimulatorEventBus';

export const SimulatorEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<SimulatorEventBus>('simulator');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useSimulatorEventBus = () => useContext(Context);
