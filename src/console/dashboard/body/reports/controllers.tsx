import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Report} from '@/services/data/tuples/report-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {useDashboardEventBus} from '../../dashboard-event-bus';
import {DashboardEventTypes} from '../../dashboard-event-bus-types';
import {ReportRefresher} from '../refresher';
import {ReportMoveOrResizeMonitor} from '../report-move-or-resize-monitor';
import {ReportRemover} from '../report-remover';

export const Controllers = (props: {
	dashboard: Dashboard;
	reports: Array<Report>;
	transient: boolean;
}) => {
	const {dashboard, reports, transient} = props;

	const {on, off, fire} = useDashboardEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onRefreshIntervalChanged = () => {
			fire(DashboardEventTypes.SAVE_DASHBOARD, dashboard);
		};
		on(DashboardEventTypes.REFRESH_INTERVAL_CHANGED, onRefreshIntervalChanged);
		return () => {
			off(DashboardEventTypes.REFRESH_INTERVAL_CHANGED, onRefreshIntervalChanged);
		};
	}, [on, off, fire, dashboard]);
	useEffect(() => {
		const onRepaintAll = (d: Dashboard) => {
			// eslint-disable-next-line
			if (d.dashboardId != dashboard.dashboardId) {
				return;
			}
			forceUpdate();
		};
		on(DashboardEventTypes.REPAINT_REPORTS_ON_ADDED, onRepaintAll);
		on(DashboardEventTypes.REPAINT_REPORTS_ON_REMOVED, onRepaintAll);
		return () => {
			off(DashboardEventTypes.REPAINT_REPORTS_ON_ADDED, onRepaintAll);
			off(DashboardEventTypes.REPAINT_REPORTS_ON_REMOVED, onRepaintAll);
		};
	}, [on, off, forceUpdate, dashboard.dashboardId]);

	return <>
		<ReportRefresher dashboard={dashboard} reports={reports}/>
		{transient ? null : <ReportMoveOrResizeMonitor dashboard={dashboard}/>}
		<ReportRemover dashboard={dashboard}/>
	</>;
};