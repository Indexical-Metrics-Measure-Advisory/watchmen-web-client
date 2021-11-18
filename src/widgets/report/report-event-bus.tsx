import React, {createContext, ReactNode, useContext} from 'react';
import {useCreateEventBus} from '../events/use-create-event-bus';
import {ReportEventBus} from './report-event-bus-types';

const Context = createContext<ReportEventBus>({} as ReportEventBus);
Context.displayName = 'ReportEventBus';

export const ReportEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ReportEventBus>('report');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useReportEventBus = () => useContext(Context);
