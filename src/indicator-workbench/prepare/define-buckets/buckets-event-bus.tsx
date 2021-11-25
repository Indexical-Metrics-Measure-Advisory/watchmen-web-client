import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {BucketsEventBus} from './buckets-event-bus-types';

const Context = createContext<BucketsEventBus>({} as BucketsEventBus);
Context.displayName = 'BucketsEventBus';

export const BucketsEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<BucketsEventBus>('buckets');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useBucketsEventBus = () => useContext(Context);
