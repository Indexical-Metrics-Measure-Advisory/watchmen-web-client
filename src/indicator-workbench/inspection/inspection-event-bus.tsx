import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {InspectionEventBus} from './inspection-event-bus-types';

const Context = createContext<InspectionEventBus>({} as InspectionEventBus);
Context.displayName = 'InspectionEventBus';

export const InspectionEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<InspectionEventBus>('inspection');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useInspectionEventBus = () => useContext(Context);
