import {CUSTOMIZED} from '@/services/data/tuples/chart-def/chart-customized';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {EchartsScriptHolder} from '@/services/data/tuples/echarts/echarts-script-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {BASE_COLORS_24} from '../../basic/colors';
import {DefaultChartUtils} from './default-chart-utils';
import {buildOptionsByScript} from './script-utils';
import {buildEChartsTitle} from './title-utils';
import {ChartOptions} from './types';

export class ChartCustomizedUtils extends DefaultChartUtils {
	constructor() {
		super(CUSTOMIZED);
	}

	async buildOptions(report: Report, dataset: ChartDataSet): Promise<ChartOptions> {
		const {chart} = report;
		const {settings} = chart;
		const {script = '', scriptVars} = (settings || {}) as EchartsScriptHolder;

		return buildOptionsByScript(script, {
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			vars: scriptVars ?? {},
			data: dataset.data
		});
	}
}
