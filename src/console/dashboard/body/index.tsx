import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {ReportEventBusProvider} from '@/widgets/report/report-event-bus';
import React, {useEffect, useState} from 'react';
import {useConsoleEventBus} from '../../console-event-bus';
import {ConsoleEventTypes} from '../../console-event-bus-types';
import {NoReportOrParagraph} from './no-report-or-paragraph';
import {Paragraphs} from './paragraphs';
import {Reports} from './reports';
import {DashboardBodyContainer} from './widgets';

export const DashboardBody = (props: { dashboard: Dashboard, removable?: boolean, transient?: boolean }) => {
	const {dashboard, removable = true, transient = false} = props;

	const {fire: fireConsole} = useConsoleEventBus();
	const [connectedSpaces, setConnectedSpaces] = useState<Array<ConnectedSpace>>([]);
	useEffect(() => {
		fireConsole(ConsoleEventTypes.ASK_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
			setConnectedSpaces(connectedSpaces);
		});
	}, [fireConsole]);

	return <ReportEventBusProvider>
		<DashboardBodyContainer>
			<NoReportOrParagraph dashboard={dashboard}/>
			<Reports connectedSpaces={connectedSpaces} dashboard={dashboard}
			         transient={transient} removable={removable}/>
			<Paragraphs dashboard={dashboard} transient={transient} removable={removable}/>
		</DashboardBodyContainer>
	</ReportEventBusProvider>;
};