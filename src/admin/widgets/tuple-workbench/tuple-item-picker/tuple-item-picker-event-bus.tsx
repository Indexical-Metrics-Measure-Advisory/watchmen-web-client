import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode, useContext} from 'react';
import {TupleItemPickerEventBus} from './tuple-item-picker-event-bus-types';

const Context = React.createContext<TupleItemPickerEventBus>({} as TupleItemPickerEventBus);
Context.displayName = 'TupleItemPickerEventBus';

export const TupleItemPickerEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<TupleItemPickerEventBus>('tuple item picker');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useTupleItemPickerEventBus = () => useContext(Context);
