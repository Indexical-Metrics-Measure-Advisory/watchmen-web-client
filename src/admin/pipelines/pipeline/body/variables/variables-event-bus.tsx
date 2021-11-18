import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {VariablesEventBus} from './variables-event-bus-types';

const Context = createContext<VariablesEventBus>({} as VariablesEventBus);
Context.displayName = 'VariablesEventBus';

export const VariablesEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<VariablesEventBus>('variables');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useVariablesEventBus = () => useContext(Context);
