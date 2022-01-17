import {COUNT, CountChartSettings} from '@/services/data/tuples/chart-def/chart-count';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report, ReportIndicatorArithmetic} from '@/services/data/tuples/report-types';
import {cleanUselessValues} from './data-utils';
import {DefaultChartUtils} from './default-chart-utils';
import {buildEChartsTitle} from './title-utils';
import {ChartOptions} from './types';

export class ChartCountUtils extends DefaultChartUtils {
	constructor() {
		super(COUNT);
	}

	shouldHasDimension(): boolean {
		return false;
	}

	shouldHasTruncation(): boolean {
		return false;
	}

	defendIndicatorMinCount(report: Report) {
		super.defendIndicatorMinCount(report);
		(report.indicators || []).forEach(indicator => {
			if (indicator.arithmetic == null || indicator.arithmetic.trim().length === 0) {
				indicator.arithmetic = ReportIndicatorArithmetic.COUNT;
			}
		});
	}

	async buildOptions(report: Report, dataset: ChartDataSet): Promise<ChartOptions> {
		let value: string | number = ((dataset.data[0] ?? [])[0] as number | null | undefined) || 0;

		const {chart} = report;
		const {settings} = chart;
		const {
			countText: {
				font = {},
				formatUseGrouping
			} = {}
		} = (settings || {}) as CountChartSettings;

		if (formatUseGrouping) {
			value = new Intl.NumberFormat(undefined, {useGrouping: true}).format(value);
		}

		const {family, size, color, weight, style} = font;

		return cleanUselessValues({
			title: buildEChartsTitle(chart as ECharts),
			graphic: [{
				type: 'text',
				top: 'middle',
				left: 'center',
				style: {
					text: `${value}`,
					fontFamily: family,
					fontSize: size,
					fontStyle: style,
					fontWeight: weight,
					fill: color
				}
			}]
		});
	}
}
