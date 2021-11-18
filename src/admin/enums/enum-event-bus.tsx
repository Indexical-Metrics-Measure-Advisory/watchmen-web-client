import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import {useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React, {createContext, ReactNode, useContext} from 'react';
import {EnumEventBus, EnumEventTypes} from './enum-event-bus-types';

const Context = createContext<EnumEventBus>({} as EnumEventBus);
Context.displayName = 'EnumEventBus';

export const EnumEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const {fire} = useTupleEventBus();
	const bus = useCreateEventBus<EnumEventBus>('enum', {
		beforeFire: (type: string) => {
			if (type !== EnumEventTypes.ITEM_SEARCH_TEXT_CHANGED) {
				fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
			}
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useEnumEventBus = () => useContext(Context);
