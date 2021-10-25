import React, {ReactNode, useContext} from 'react';
import {useCreateEventBus} from './use-create-event-bus';
import {EventBus} from './types';

const Context = React.createContext<EventBus>({} as EventBus);
Context.displayName = 'EventBus';

export const EventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<EventBus>('event');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useEventBus = () => useContext(Context);
