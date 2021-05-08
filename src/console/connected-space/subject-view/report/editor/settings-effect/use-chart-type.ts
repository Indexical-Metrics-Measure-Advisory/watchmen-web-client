import {useEffect} from 'react';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {Report} from '../../../../../../services/tuples/report-types';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';

export const useChartType = (options: { report: Report }) => {
	const {report} = options;

	const {on, off} = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onChartTypeChanged = (changedReport: Report) => {
			if (changedReport !== report) {
				return;
			}
			forceUpdate();
		};
		on(ReportEditEventTypes.CHART_TYPE_CHANGED, onChartTypeChanged);
		return () => {
			off(ReportEditEventTypes.CHART_TYPE_CHANGED, onChartTypeChanged);
		};
	}, [on, off, forceUpdate, report]);
};
