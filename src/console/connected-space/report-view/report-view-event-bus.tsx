import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {ReportViewEventBus} from './report-view-event-bus-types';

const Context = createContext<ReportViewEventBus>({} as ReportViewEventBus);
Context.displayName = 'ReportViewEventBus';

export const ReportViewEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ReportViewEventBus>('report view');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useReportViewEventBus = () => useContext(Context);
