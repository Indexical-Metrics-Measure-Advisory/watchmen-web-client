import {ReportRefresher} from '@/console/dashboard/body/refresher';
import {ReportMoveOrResizeMonitor} from '@/console/dashboard/body/report-move-or-resize-monitor';
import {ReportRemover} from '@/console/dashboard/body/report-remover';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Report} from '@/services/data/tuples/report-types';
import {Chart} from '@/widgets/report';
import React from 'react';

export const Reports = (props: {
	connectedSpaces: Array<ConnectedSpace>;
	dashboard: Dashboard;
	transient: boolean;
	removable: boolean;
}) => {
	const {connectedSpaces, dashboard, transient, removable} = props;

	const reportMap = connectedSpaces.reduce((map, connectedSpace) => {
		connectedSpace.subjects.forEach(subject => (subject.reports || []).forEach(report => map.set(report.reportId, report)));
		return map;
	}, new Map<string, Report>());
	const reports = (dashboard.reports || []).map(dashboardReport => {
		const report = reportMap.get(dashboardReport.reportId);
		if (report != null) {
			return {
				// serialize & deserialize for void change the stored funnels data in report definition
				...(JSON.parse(JSON.stringify(report))),
				rect: dashboardReport.rect
			};
		} else {
			return null;
		}
	}).filter(x => !!x) as Array<Report>;

	return <>
		{reports.length !== 0
			? reports.map(report => {
				return <Chart report={report} fixed={false}
				              editable={false} editing={false}
				              removable={removable}
				              key={report.reportId}/>;
			})
			: null}
		<ReportRefresher dashboard={dashboard} reports={reports}/>
		{transient ? null : <ReportMoveOrResizeMonitor dashboard={dashboard}/>}
		<ReportRemover dashboard={dashboard}/>
	</>;
};