import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode, useContext} from 'react';
import {TupleEventBus} from './tuple-event-bus-types';

const Context = React.createContext<TupleEventBus>({} as TupleEventBus);
Context.displayName = 'TupleEventBus';

export const TupleEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<TupleEventBus>('tuple');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useTupleEventBus = () => useContext(Context);
