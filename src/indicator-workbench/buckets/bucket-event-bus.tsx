import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode, useContext} from 'react';
import {BucketEventBus} from './bucket-event-bus-types';

const Context = React.createContext<BucketEventBus>({} as BucketEventBus);
Context.displayName = 'BucketEventBus';

export const BucketEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<BucketEventBus>('bucket');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useBucketEventBus = () => useContext(Context);
