import {ChartDataSet} from '@/services/tuples/chart-types';
import {Report} from '@/services/tuples/report-types';
import {ChartHelper} from '../chart-utils';
import {ChartOptions} from '../chart-utils/types';
import {EChartDiagram} from './echart-diagram';

const isJSXElement = (options: ChartOptions): options is JSX.Element => {
	return !!(options as any).$$typeof;
};

export const ChartDiagram = (props: { report: Report, dataset: ChartDataSet }) => {
	const {report, dataset} = props;
	const {chart: {type: chartType}} = report;

	const chartUtils = ChartHelper[chartType];
	const options = chartUtils.buildOptions(report, dataset);

	if (isJSXElement(options)) {
		return <>{options}</>;
	} else {
		return <EChartDiagram report={report} options={options}/>;
	}
};