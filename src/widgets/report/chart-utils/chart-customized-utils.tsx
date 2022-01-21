import {CUSTOMIZED} from '@/services/data/tuples/chart-def/chart-customized';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {
	DefItem,
	EchartsScriptHolder,
	EchartsScriptsVars,
	ItemType
} from '@/services/data/tuples/echarts/echarts-script-types';
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
		const {script = '', scriptVarsDefs, scriptVars} = (settings || {}) as EchartsScriptHolder;

		const buildScriptVars = (scriptVars?: EchartsScriptsVars): EchartsScriptsVars => {
			const vars = scriptVars ?? {};
			const defs = (scriptVarsDefs ?? '').trim();
			if (defs.length === 0) {
				return vars;
			}

			const items: Array<DefItem> = (() => {
				try {
					// eslint-disable-next-line
					return eval(defs);
				} catch (e) {
					return [];
				}
			})();

			items.filter(item => item.type !== ItemType.SECTION).forEach((item) => {
				const {key, defaultValue} = item as any;
				if (vars[key] == null) {
					vars[key] = defaultValue;
				}
			});

			return vars;
		};

		return buildOptionsByScript(script, {
			color: BASE_COLORS_24,
			title: buildEChartsTitle(chart as ECharts),
			vars: buildScriptVars(scriptVars),
			data: dataset.data
		});
	}
}
