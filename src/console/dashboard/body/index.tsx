import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Lang} from '@/widgets/langs';
import {ReportEventBusProvider} from '@/widgets/report/report-event-bus';
import React, {useEffect, useState} from 'react';
import {useConsoleEventBus} from '../../console-event-bus';
import {ConsoleEventTypes} from '../../console-event-bus-types';
import {Paragraphs} from './paragraphs';
import {Reports} from './reports';
import {DashboardBodyContainer, DashboardNoReport} from './widgets';

export const DashboardBody = (props: { dashboard: Dashboard, removable?: boolean, transient?: boolean }) => {
	const {dashboard, removable = true, transient = false} = props;

	const {once: onceConsole} = useConsoleEventBus();
	const [connectedSpaces, setConnectedSpaces] = useState<Array<ConnectedSpace>>([]);
	useEffect(() => {
		onceConsole(ConsoleEventTypes.REPLY_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
			setConnectedSpaces(connectedSpaces);
		}).fire(ConsoleEventTypes.ASK_CONNECTED_SPACES);
	}, [onceConsole]);

	const reports = dashboard.reports || [];
	const paragraphs = dashboard.paragraphs || [];

	return <ReportEventBusProvider>
		<DashboardBodyContainer>
			{reports.length !== 0 || paragraphs.length !== 0
				? null
				: <DashboardNoReport><span>{Lang.CONSOLE.DASHBOARD.NO_REPORT}</span></DashboardNoReport>}
			<Reports connectedSpaces={connectedSpaces} dashboard={dashboard}
			         transient={transient} removable={removable}/>
			<Paragraphs dashboard={dashboard} transient={transient} removable={removable}/>
		</DashboardBodyContainer>
	</ReportEventBusProvider>;
};