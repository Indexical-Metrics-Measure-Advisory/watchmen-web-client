import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {CatalogEventBus} from './catalog-event-bus-types';

const Context = createContext<CatalogEventBus>({} as CatalogEventBus);
Context.displayName = 'CatalogEventBus';

export const CatalogEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<CatalogEventBus>('catalog');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useCatalogEventBus = () => useContext(Context);
