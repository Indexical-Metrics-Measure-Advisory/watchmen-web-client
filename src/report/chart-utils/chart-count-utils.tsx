import { COUNT } from '../../services/tuples/chart-def/chart-count';
import { ChartDataSet } from '../../services/tuples/chart-types';
import { Report } from '../../services/tuples/report-types';
import { DefaultChartUtils } from './default-chart-utils';
import { ChartOptions } from './types';

export class ChartCountUtils extends DefaultChartUtils {
	constructor() {
		super(COUNT);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		return <div/>;
	}
}
