import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {Report} from '@/services/data/tuples/report-types';
import {ICON_LOADING} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
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
	const {fire: fireReport, on: onReport, off: offReport} = useReportEventBus();
	const {on, off, fire} = useReportDataSetEventBus();
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const onDataLoaded = (aReport: Report, dataset: ChartDataSet) => {
			if (report !== aReport) {
				return;
			}

			fire(ReportDataSetEventTypes.DATA_LOADED, report, dataset);
			setVisible(false);
		};
		onReport(ReportEventTypes.DATA_LOADED, onDataLoaded);
		return () => {
			offReport(ReportEventTypes.DATA_LOADED, onDataLoaded);
		};
	}, [onReport, offReport, fire, report]);
	useEffect(() => {
		const onAskLoadData = (aReport: Report) => {
			if (report !== aReport) {
				return;
			}

			// ask data from chart
			setVisible(true);
			fireReport(ReportEventTypes.ASK_DATA, aReport, (dataset: ChartDataSet) => {
				fire(ReportDataSetEventTypes.DATA_LOADED, aReport, dataset);
				setVisible(false);
			});
		};
		on(ReportDataSetEventTypes.ASK_LOAD_DATA, onAskLoadData);
		return () => {
			off(ReportDataSetEventTypes.ASK_LOAD_DATA, onAskLoadData);
		};
	}, [on, off, fire, fireReport, report]);
	useEffect(() => {
		const onLoadData = (aReport: Report) => {
			if (aReport !== report) {
				return;
			}

			setVisible(true);
			// loading data will be processed in chart component
		};

		onReport(ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, onLoadData);
		onReport(ReportEventTypes.DO_REFRESH, onLoadData);
		return () => {
			offReport(ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, onLoadData);
			offReport(ReportEventTypes.DO_REFRESH, onLoadData);
		};
	}, [fireGlobal, fire, fireReport, onReport, offReport, report]);

	return <ReportDataSetLoading visible={visible}>
		<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
	</ReportDataSetLoading>;

};