import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode} from 'react';
import {GridEventBus} from './grid-event-bus-types';

const Context = React.createContext<GridEventBus>({} as GridEventBus);
Context.displayName = 'GridEventBus';

export const GridEventBusProvider = (props: { children?: ReactNode; }) => {
	const {children} = props;

	const bus = useCreateEventBus<GridEventBus>('grid');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useGridEventBus = () => {
	return React.useContext(Context);
};
