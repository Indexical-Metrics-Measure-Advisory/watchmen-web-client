import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const TREEMAP: ChartDef = {
	type: ChartType.TREEMAP,
	minDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 1
	// buildOptions: (chart: ConsoleSpaceSubjectChart, space: ConsoleSpace, dataset: ConsoleSpaceSubjectChartDataSet) => {
	// 	return {
	// 		color: BaseColors24,
	// 		tooltip: {
	// 			trigger: 'item'
	// 		},
	// 		series: [ {
	// 			name: chart.name,
	// 			type: 'treemap',
	// 			leafDepth: 1,
	// 			data: buildTreeData(chart, dataset)
	// 		} ]
	// 	};
	// }
};
