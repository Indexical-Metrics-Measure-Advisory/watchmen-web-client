import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {ConditionalEventBus} from './conditional-event-bus-types';

const Context = createContext<ConditionalEventBus>({} as ConditionalEventBus);
Context.displayName = 'ConditionalEventBus';

export const ConditionalEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ConditionalEventBus>('conditional');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useConditionalEventBus = () => useContext(Context);
