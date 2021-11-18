import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import {useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React, {createContext, ReactNode, useContext} from 'react';
import {BucketEventBus} from './bucket-event-bus-types';

const Context = createContext<BucketEventBus>({} as BucketEventBus);
Context.displayName = 'BucketEventBus';

export const BucketEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const {fire} = useTupleEventBus();
	// noinspection JSUnusedLocalSymbols
	const bus = useCreateEventBus<BucketEventBus>('bucket', {
		beforeFire: (type: string) => {
			fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useBucketEventBus = () => useContext(Context);
