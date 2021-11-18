import React, {createContext, ReactNode, useContext} from 'react';
import {useCreateEventBus} from '../../events/use-create-event-bus';
import {TupleItemPickerEventBus} from './tuple-item-picker-event-bus-types';

const Context = createContext<TupleItemPickerEventBus>({} as TupleItemPickerEventBus);
Context.displayName = 'TupleItemPickerEventBus';

export const TupleItemPickerEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<TupleItemPickerEventBus>('tuple item picker');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useTupleItemPickerEventBus = () => useContext(Context);
