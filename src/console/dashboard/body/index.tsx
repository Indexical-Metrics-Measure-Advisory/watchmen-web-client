import React, { useEffect, useState } from 'react';
import { useForceUpdate } from '../../../basic-widgets/utils';
import { Lang } from '../../../langs';
import { Chart } from '../../../report';
import { ReportEventBusProvider } from '../../../report/report-event-bus';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { Dashboard } from '../../../services/tuples/dashboard-types';
import { Report } from '../../../services/tuples/report-types';
import { useConsoleEventBus } from '../../console-event-bus';
import { ConsoleEventTypes } from '../../console-event-bus-types';
import { useDashboardEventBus } from '../dashboard-event-bus';
import { DashboardEventTypes } from '../dashboard-event-bus-types';
import { PagePrintSize } from './page-print-size';
import { ReportMoveOrResizeMonitor } from './report-move-or-resize-monitor';
import { ReportRemover } from './report-remover';
import { DashboardBodyContainer, DashboardNoReport } from './widgets';

export const DashboardBody = (props: { dashboard: Dashboard, removable?: boolean, transient?: boolean }) => {
	const { dashboard, removable = true, transient = false } = props;

	const { once: onceConsole } = useConsoleEventBus();
	const { on, off } = useDashboardEventBus();
	const [ connectedSpaces, setConnectedSpaces ] = useState<Array<ConnectedSpace>>([]);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		onceConsole(ConsoleEventTypes.REPLY_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
			setConnectedSpaces(connectedSpaces);
		}).fire(ConsoleEventTypes.ASK_CONNECTED_SPACES);
	}, [ onceConsole ]);
	useEffect(() => {
		on(DashboardEventTypes.REPORT_ADDED, forceUpdate);
		on(DashboardEventTypes.REPORT_REMOVED, forceUpdate);
		return () => {
			off(DashboardEventTypes.REPORT_ADDED, forceUpdate);
			off(DashboardEventTypes.REPORT_REMOVED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	const reportMap = connectedSpaces.reduce((map, connectedSpace) => {
		connectedSpace.subjects.forEach(subject => (subject.reports || []).map(report => map.set(report.reportId, report)));
		return map;
	}, new Map<string, Report>());
	const reports = (dashboard.reports || []).map(dashboardReport => {
		const report = reportMap.get(dashboardReport.reportId);
		if (report != null) {
			return {
				...report,
				rect: dashboardReport.rect
			};
		} else {
			return null;
		}
	}).filter(x => !!x) as Array<Report>;

	return <ReportEventBusProvider>
		<DashboardBodyContainer>
			{reports.length !== 0
				? reports?.map(report => {
					return <Chart report={report} fixed={false}
					              editable={false} editing={false}
					              removable={removable}
					              key={report.reportId}/>;
				})
				: <DashboardNoReport><span>{Lang.CONSOLE.CONNECTED_SPACE.NO_REPORT}</span></DashboardNoReport>}
			<PagePrintSize dashboard={dashboard}/>
		</DashboardBodyContainer>
		{transient ? null : <ReportMoveOrResizeMonitor dashboard={dashboard}/>}
		<ReportRemover dashboard={dashboard}/>
	</ReportEventBusProvider>;
};