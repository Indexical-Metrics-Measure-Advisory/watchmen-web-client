import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {ReportDataSetEventBus} from './report-dataset-event-bus-types';

const Context = createContext<ReportDataSetEventBus>({} as ReportDataSetEventBus);
Context.displayName = 'ReportDataSetEventBus';

export const ReportDataSetEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ReportDataSetEventBus>('report dataset');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useReportDataSetEventBus = () => useContext(Context);
