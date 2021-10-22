import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode, useContext} from 'react';
import {ActionEventBus} from './action-event-bus-types';

const Context = React.createContext<ActionEventBus>({} as ActionEventBus);
Context.displayName = 'ActionEventBus';

export const ActionEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ActionEventBus>('action');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useActionEventBus = () => useContext(Context);
