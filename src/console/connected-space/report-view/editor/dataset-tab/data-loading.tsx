import {fetchChartData, fetchChartDataTemporary} from '@/services/data/console/report';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {Report} from '@/services/data/tuples/report-types';
import {ICON_LOADING} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {useReportEventBus} from '@/widgets/report/report-event-bus';
import {ReportEventTypes} from '@/widgets/report/report-event-bus-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {useReportDataSetEventBus} from './report-dataset-event-bus';
import {ReportDataSetEventTypes} from './report-dataset-event-bus-types';
import {ReportDataSetLoading} from './widgets';

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
			if (report.simulating) {
				fire(ReportDataSetEventTypes.DATA_LOADED, report, {
					data: report.simulateData ?? []
				});
				setVisible(false);
			} else {
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
			}
		};
		on(ReportDataSetEventTypes.ASK_LOAD_DATA, onLoadData);
		onReport(ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, onLoadData);
		onReport(ReportEventTypes.DO_REFRESH, onLoadData);
		return () => {
			off(ReportDataSetEventTypes.ASK_LOAD_DATA, onLoadData);
			offReport(ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, onLoadData);
			offReport(ReportEventTypes.DO_REFRESH, onLoadData);
		};
	}, [fireGlobal, on, off, fire, onceReport, onReport, offReport, report]);

	return <ReportDataSetLoading visible={visible}>
		<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
	</ReportDataSetLoading>;

};