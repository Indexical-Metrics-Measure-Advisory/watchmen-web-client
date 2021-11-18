import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {createContext, ReactNode, useContext} from 'react';
import {ReportEditEventBus} from './report-edit-event-bus-types';

const Context = createContext<ReportEditEventBus>({} as ReportEditEventBus);
Context.displayName = 'ReportEditEventBus';

export const ReportEditEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ReportEditEventBus>('report edit');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useReportEditEventBus = () => useContext(Context);
