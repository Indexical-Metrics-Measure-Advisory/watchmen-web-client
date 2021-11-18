import React, {createContext, ReactNode, useContext} from 'react';
import {useCreateEventBus} from '../events/use-create-event-bus';
import {GridEventBus} from './grid-event-bus-types';

const Context = createContext<GridEventBus>({} as GridEventBus);
Context.displayName = 'GridEventBus';

export const GridEventBusProvider = (props: { children?: ReactNode; }) => {
	const {children} = props;

	const bus = useCreateEventBus<GridEventBus>('grid');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useGridEventBus = () => {
	return useContext(Context);
};
