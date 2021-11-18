import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {FactorsMappingEventBus} from './factors-mapping-event-bus-types';

const Context = createContext<FactorsMappingEventBus>({} as FactorsMappingEventBus);
Context.displayName = 'FactorsMappingEventBus';

export const FactorsMappingEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<FactorsMappingEventBus>('factors mapping');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useFactorsMappingEventBus = () => useContext(Context);
