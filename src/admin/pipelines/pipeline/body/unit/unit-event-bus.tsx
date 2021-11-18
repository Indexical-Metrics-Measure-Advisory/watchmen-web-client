import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {UnitEventBus} from './unit-event-bus-types';

const Context = createContext<UnitEventBus>({} as UnitEventBus);
Context.displayName = 'UnitEventBus';

export const UnitEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<UnitEventBus>('unit');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useUnitEventBus = () => useContext(Context);
