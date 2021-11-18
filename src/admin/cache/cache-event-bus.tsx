import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {AdminCacheEventBus} from './cache-event-bus-types';

const Context = createContext<AdminCacheEventBus>({} as AdminCacheEventBus);
Context.displayName = 'CacheEventBus';

export const AdminCacheEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<AdminCacheEventBus>('admin cache');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useAdminCacheEventBus = () => useContext(Context);
