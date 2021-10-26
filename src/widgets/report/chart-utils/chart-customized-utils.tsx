import {CUSTOMIZED} from '@/services/data/tuples/chart-def/chart-customized';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {BASE_COLORS_24} from '../../basic/colors';
import {cleanUselessValues} from './data-utils';
import {DefaultChartUtils} from './default-chart-utils';
import {buildEChartsTitle} from './title-utils';
import {ChartOptions} from './types';

export class ChartCustomizedUtils extends DefaultChartUtils {
	constructor() {
		super(CUSTOMIZED);
	}

	buildOptions(report: Report, dataset: ChartDataSet): ChartOptions {
		let value: string | number = ((dataset.data[0] ?? [])[0] as number | null | undefined) || 0;
		if (isNaN(value)) {
			value = 0;
		}

		const {chart} = report;
		// const {settings} = chart;
		// const {} = (settings || {}) as CustomizedChartSettings;

		return cleanUselessValues({
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			graphic: [{
				type: 'text',
				top: 'middle',
				left: 'center',
				style: {}
			}]
		});
	}
}
