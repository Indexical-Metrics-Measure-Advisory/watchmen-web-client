import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {DataQualityCacheEventBus} from './cache-event-bus-types';

const Context = createContext<DataQualityCacheEventBus>({} as DataQualityCacheEventBus);
Context.displayName = 'CacheEventBus';

export const DataQualityCacheEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<DataQualityCacheEventBus>('data quality cache');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useDataQualityCacheEventBus = () => useContext(Context);
