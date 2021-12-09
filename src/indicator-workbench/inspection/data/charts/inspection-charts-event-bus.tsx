import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {InspectionChartsEventBus} from './inspection-charts-event-bus-types';

const Context = createContext<InspectionChartsEventBus>({} as InspectionChartsEventBus);
Context.displayName = 'InspectionChartsChartsEventBus';

export const InspectionChartsEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<InspectionChartsEventBus>('inspection-charts');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useInspectionChartsEventBus = () => useContext(Context);
