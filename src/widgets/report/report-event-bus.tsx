import {useCreateEventBus} from '@/widgets/events/use-create-event-bus';
import React, {ReactNode, useContext} from 'react';
import {ReportEventBus} from './report-event-bus-types';

const Context = React.createContext<ReportEventBus>({} as ReportEventBus);
Context.displayName = 'ReportEventBus';

export const ReportEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ReportEventBus>('report');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useReportEventBus = () => useContext(Context);
