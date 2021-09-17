import {Report} from '@/services/data/tuples/report-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEffect} from 'react';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';

export const useChartType = (options: { report: Report, beforeForceUpdate?: () => void }) => {
	const {report, beforeForceUpdate} = options;

	const {on, off} = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onChartTypeChanged = (changedReport: Report) => {
			if (changedReport !== report) {
				return;
			}
			beforeForceUpdate && beforeForceUpdate();
			forceUpdate();
		};
		on(ReportEditEventTypes.CHART_TYPE_CHANGED, onChartTypeChanged);
		return () => {
			off(ReportEditEventTypes.CHART_TYPE_CHANGED, onChartTypeChanged);
		};
	}, [on, off, forceUpdate, report, beforeForceUpdate]);
};
