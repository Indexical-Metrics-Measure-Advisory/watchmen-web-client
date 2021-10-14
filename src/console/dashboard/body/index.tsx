import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {saveDashboard} from '@/services/data/tuples/dashboard';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {ReportEventBusProvider} from '@/widgets/report/report-event-bus';
import React, {useEffect, useState} from 'react';
import {useConsoleEventBus} from '../../console-event-bus';
import {ConsoleEventTypes} from '../../console-event-bus-types';
import {useDashboardEventBus} from '../dashboard-event-bus';
import {DashboardEventTypes} from '../dashboard-event-bus-types';
import {Paragraphs} from './paragraphs';
import {Reports} from './reports';
import {DashboardBodyContainer, DashboardNoReport} from './widgets';

export const DashboardBody = (props: { dashboard: Dashboard, removable?: boolean, transient?: boolean }) => {
	const {dashboard, removable = true, transient = false} = props;

	const {fire: fireGlobal} = useEventBus();
	const {once: onceConsole} = useConsoleEventBus();
	const {on, off} = useDashboardEventBus();
	const [connectedSpaces, setConnectedSpaces] = useState<Array<ConnectedSpace>>([]);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		onceConsole(ConsoleEventTypes.REPLY_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
			setConnectedSpaces(connectedSpaces);
		}).fire(ConsoleEventTypes.ASK_CONNECTED_SPACES);
	}, [onceConsole]);
	useEffect(() => {
		const onReportChanged = () => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveDashboard(dashboard),
				() => forceUpdate());
		};
		const onParagraphChanged = () => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveDashboard(dashboard),
				() => forceUpdate());
		};
		const onRefreshIntervalChanged = () => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveDashboard(dashboard),
				() => {
				});
		};
		on(DashboardEventTypes.REPORT_ADDED, onReportChanged);
		on(DashboardEventTypes.REPORT_REMOVED, onReportChanged);
		on(DashboardEventTypes.PARAGRAPH_ADDED, onParagraphChanged);
		on(DashboardEventTypes.PARAGRAPH_REMOVED, onParagraphChanged);
		on(DashboardEventTypes.REFRESH_INTERVAL_CHANGED, onRefreshIntervalChanged);
		return () => {
			off(DashboardEventTypes.REPORT_ADDED, onReportChanged);
			off(DashboardEventTypes.REPORT_REMOVED, onReportChanged);
			off(DashboardEventTypes.PARAGRAPH_ADDED, onParagraphChanged);
			off(DashboardEventTypes.PARAGRAPH_REMOVED, onParagraphChanged);
			off(DashboardEventTypes.REFRESH_INTERVAL_CHANGED, onRefreshIntervalChanged);
		};
	}, [on, off, fireGlobal, forceUpdate, dashboard]);

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