import React, {useEffect, useState} from 'react';
import {v4} from 'uuid';
import {useForceUpdate} from '@/basic-widgets/utils';
import {useEventBus} from '@/events/event-bus';
import {EventTypes} from '@/events/types';
import {Lang} from '@/langs';
import {Chart} from '@/report';
import {ParagraphPanel} from '@/report/paragraph';
import {ReportEventBusProvider} from '@/report/report-event-bus';
import {ConnectedSpace} from '@/services/tuples/connected-space-types';
import {saveDashboard} from '@/services/tuples/dashboard';
import {Dashboard} from '@/services/tuples/dashboard-types';
import {Report} from '@/services/tuples/report-types';
import {useConsoleEventBus} from '../../console-event-bus';
import {ConsoleEventTypes} from '../../console-event-bus-types';
import {useDashboardEventBus} from '../dashboard-event-bus';
import {DashboardEventTypes} from '../dashboard-event-bus-types';
import {PagePrintSize} from './page-print-size';
import {ParagraphMoveOrResizeMonitor} from './paragraph-move-or-resize-monitor';
import {ParagraphRemover} from './paragraph-remover';
import {ReportRefresher} from './refresher';
import {ReportMoveOrResizeMonitor} from './report-move-or-resize-monitor';
import {ReportRemover} from './report-remover';
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
	const paragraphs = dashboard.paragraphs || [];

	return <ReportEventBusProvider>
		<DashboardBodyContainer>
			{reports.length !== 0 || paragraphs.length !== 0
				? null
				: <DashboardNoReport><span>{Lang.CONSOLE.DASHBOARD.NO_REPORT}</span></DashboardNoReport>}
			{reports.length !== 0
				? reports.map(report => {
					return <Chart report={report} fixed={false}
					              editable={false} editing={false}
					              removable={removable}
					              key={report.reportId}/>;
				})
				: null}
			{paragraphs.length !== 0
				? paragraphs.map(paragraph => {
					return <ParagraphPanel paragraph={paragraph} fixed={false}
					                       editable={true}
					                       removable={removable}
					                       key={v4()}/>;
				})
				: null}
			<PagePrintSize dashboard={dashboard}/>
			<ReportRefresher dashboard={dashboard} reports={reports}/>
		</DashboardBodyContainer>
		{transient ? null : <ReportMoveOrResizeMonitor dashboard={dashboard}/>}
		{transient ? null : <ParagraphMoveOrResizeMonitor dashboard={dashboard}/>}
		<ReportRemover dashboard={dashboard}/>
		<ParagraphRemover dashboard={dashboard}/>
	</ReportEventBusProvider>;
};