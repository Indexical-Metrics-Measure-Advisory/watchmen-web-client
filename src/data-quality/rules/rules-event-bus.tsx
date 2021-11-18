import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {RulesEventBus} from './rules-event-bus-types';

const Context = createContext<RulesEventBus>({} as RulesEventBus);
Context.displayName = 'RulesEventBus';

export const RulesEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<RulesEventBus>('rules');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useRulesEventBus = () => useContext(Context);
