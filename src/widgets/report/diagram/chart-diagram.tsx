import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {Report} from '@/services/data/tuples/report-types';
import {useEffect} from 'react';
import {ChartHelper} from '../chart-utils';
import {useReportEventBus} from '../report-event-bus';
import {ReportEventTypes} from '../report-event-bus-types';
import {EChartDiagram} from './echart-diagram';

export const ChartDiagram = (props: { report: Report, dataset: ChartDataSet; thumbnail: boolean }) => {
	const {report, dataset, thumbnail} = props;
	const {chart: {type: chartType}} = report;

	const {fire} = useReportEventBus();
	useEffect((() => {
		(async () => {
			const chartUtils = ChartHelper[chartType];
			try {
				const options = await chartUtils.buildOptions(report, dataset);
				fire(ReportEventTypes.CHART_OPTIONS_READY, report, options);
			} catch (e) {
				console.error(e);
			}
		})();
	}));

	return <EChartDiagram report={report} thumbnail={thumbnail}/>;
};