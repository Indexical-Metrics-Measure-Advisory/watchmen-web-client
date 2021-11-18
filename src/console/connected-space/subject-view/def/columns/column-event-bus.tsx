import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {ColumnEventBus} from './column-event-bus-types';

const Context = createContext<ColumnEventBus>({} as ColumnEventBus);
Context.displayName = 'ColumnEventBus';

export const ColumnEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ColumnEventBus>('column');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useColumnEventBus = () => useContext(Context);
