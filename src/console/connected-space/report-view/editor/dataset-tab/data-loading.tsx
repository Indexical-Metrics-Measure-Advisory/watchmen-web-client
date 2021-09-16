import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {ICON_LOADING} from '@/basic-widgets/constants';
import {useEventBus} from '@/events/event-bus';
import {Report} from '@/services/tuples/report-types';
import {ReportDataSetEventTypes} from './report-dataset-event-bus-types';
import {ReportDataSetLoading} from './widgets';
import {fetchChartData, fetchChartDataTemporary} from '@/services/console/report';
import {ChartDataSet} from '@/services/tuples/chart-types';
import {useReportDataSetEventBus} from './report-dataset-event-bus';
import {EventTypes} from '@/events/types';
import {useReportEventBus} from '@/report/report-event-bus';
import {ReportEventTypes} from '@/report/report-event-bus-types';

export const DataLoading = (props: { report: Report }) => {
	const {report} = props;

	const {fire: fireGlobal} = useEventBus();
	const {once: onceReport, on: onReport, off: offReport} = useReportEventBus();
	const {on, off, fire} = useReportDataSetEventBus();
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const onLoadData = (aReport: Report) => {
			if (aReport !== report) {
				return;
			}

			setVisible(true);
			onceReport(ReportEventTypes.REPLY_REPORT_STRUCTURE_CHANGED, (report: Report, changed: boolean) => {
				if (!changed) {
					fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
						async () => await fetchChartData(report.reportId, report.chart.type),
						(dataset: ChartDataSet) => {
							fire(ReportDataSetEventTypes.DATA_LOADED, report, dataset);
							setVisible(false);
						});
				} else if (changed) {
					fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
						async () => await fetchChartDataTemporary(report),
						(dataset: ChartDataSet) => {
							fire(ReportDataSetEventTypes.DATA_LOADED, report, dataset);
							setVisible(false);
						});
				}
			}).fire(ReportEventTypes.ASK_REPORT_STRUCTURE_CHANGED, report);
		};
		on(ReportDataSetEventTypes.ASK_LOAD_DATA, onLoadData);
		onReport(ReportEventTypes.DO_REFRESH, onLoadData);
		return () => {
			off(ReportDataSetEventTypes.ASK_LOAD_DATA, onLoadData);
			offReport(ReportEventTypes.DO_REFRESH, onLoadData);
		};
	}, [fireGlobal, on, off, fire, onceReport, onReport, offReport, report]);

	return <ReportDataSetLoading visible={visible}>
		<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
	</ReportDataSetLoading>;

};