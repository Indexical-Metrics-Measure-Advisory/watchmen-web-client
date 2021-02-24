import { useEffect, useState } from 'react';
import { SAVE_TIMEOUT } from '../../../../admin/pipelines/constants';
import { useReportEventBus } from '../../../../report/report-event-bus';
import { ReportEventTypes } from '../../../../report/report-event-bus-types';
import { saveDashboard } from '../../../../services/tuples/dashboard';
import { Dashboard } from '../../../../services/tuples/dashboard-types';
import { Report } from '../../../../services/tuples/report-types';

interface SaveState {
	timeoutHandle?: number;
}

export const ReportMoveOrResizeMonitor = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;

	const { on, off } = useReportEventBus();
	const [ state, setState ] = useState<SaveState>({});
	useEffect(() => {
		const onMoveOrResize = async (report: Report) => {
			// eslint-disable-next-line
			const dashboardReport = (dashboard.reports || []).find(dashboardReport => dashboardReport.reportId == report.reportId);
			if (!dashboardReport) {
				return;
			}
			dashboardReport.rect.x = report.rect.x;
			dashboardReport.rect.y = report.rect.y;
			dashboardReport.rect.width = report.rect.width;
			dashboardReport.rect.height = report.rect.height;

			if (state.timeoutHandle) {
				clearTimeout(state.timeoutHandle);
			}
			setState({
				timeoutHandle: window.setTimeout(() => {
					setState({});
					(async () => await saveDashboard(dashboard))();
				}, SAVE_TIMEOUT)
			});
		};
		on(ReportEventTypes.MOVE_OR_RESIZE_COMPLETED, onMoveOrResize);
		return () => {
			off(ReportEventTypes.MOVE_OR_RESIZE_COMPLETED, onMoveOrResize);
		};
	}, [ on, off, state.timeoutHandle, dashboard ]);
	return <></>;
};