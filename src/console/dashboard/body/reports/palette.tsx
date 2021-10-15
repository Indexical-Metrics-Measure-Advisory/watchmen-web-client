import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Report} from '@/services/data/tuples/report-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Chart} from '@/widgets/report';
import React, {useEffect} from 'react';
import {useDashboardEventBus} from '../../dashboard-event-bus';
import {DashboardEventTypes} from '../../dashboard-event-bus-types';

export const Palette = (props: { dashboard: Dashboard; reports: Array<Report>; removable: boolean }) => {
	const {dashboard, reports, removable} = props;

	const {on, off} = useDashboardEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onRepaintReports = (d: Dashboard) => {
			// eslint-disable-next-line
			if (d.dashboardId != dashboard.dashboardId) {
				return;
			}

			forceUpdate();
		};
		on(DashboardEventTypes.REPAINT_REPORTS, onRepaintReports);
		return () => {
			off(DashboardEventTypes.REPAINT_REPORTS, onRepaintReports);
		};
	}, [on, off, forceUpdate, dashboard.dashboardId, reports]);

	return <>
		{reports.map(report => {
			return <Chart report={report} fixed={false}
			              editable={false} editing={false}
			              removable={removable}
			              key={report.reportId}/>;
		})}
	</>;
};