import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {ConsoleEventBus} from './console-event-bus-types';

const Context = createContext<ConsoleEventBus>({} as ConsoleEventBus);
Context.displayName = 'ConsoleEventBus';

export const ConsoleEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ConsoleEventBus>('console');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useConsoleEventBus = () => useContext(Context);
