import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import {useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React, {createContext, ReactNode, useContext} from 'react';
import {ExternalWriterEventBus} from './external-writer-event-bus-types';

const Context = createContext<ExternalWriterEventBus>({} as ExternalWriterEventBus);
Context.displayName = 'ExternalWriterEventBus';

export const ExternalWriterEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const {fire} = useTupleEventBus();
	const bus = useCreateEventBus<ExternalWriterEventBus>('external writer', {
		beforeFire: () => fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED)
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useExternalWriterEventBus = () => useContext(Context);
