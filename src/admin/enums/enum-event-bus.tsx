import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode, useContext} from 'react';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {EnumEventBus, EnumEventTypes} from './enum-event-bus-types';

const Context = React.createContext<EnumEventBus>({} as EnumEventBus);
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
