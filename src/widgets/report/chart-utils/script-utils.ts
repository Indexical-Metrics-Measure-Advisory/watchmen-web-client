import {ChartDataSetRows} from '@/services/data/tuples/chart-types';
import {TitleComponentOption} from 'echarts/components';
import {cleanUselessValues} from './data-utils';
import {ChartEChartOptions} from './types';

export interface ScriptOptions {
	color: Array<string>;
	title?: TitleComponentOption;
	vars?: { [key in string]: any };
	data?: ChartDataSetRows;
}

export const buildOptionsByScript = (script: string, options: ScriptOptions): ChartEChartOptions => {
	if (script && script.trim().length > 0) {
		try {
			// eslint-disable-next-line
			return cleanUselessValues(eval(script));
		} catch (e) {
			console.error(e);
			return cleanUselessValues(options);
		}
	} else {
		return cleanUselessValues(options);
	}
};