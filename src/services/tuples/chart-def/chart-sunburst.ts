import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const SUNBURST: ChartDef = {
	type: ChartType.SUNBURST,
	minDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 1,
	// buildOptions: (chart: ConsoleSpaceSubjectChart, space: ConsoleSpace, dataset: ConsoleSpaceSubjectChartDataSet) => {
	// 	return {
	// 		color: BaseColors24,
	// 		tooltip: {
	// 			trigger: 'item'
	// 		},
	// 		series: [ {
	// 			type: 'sunburst',
	// 			radius: [ '10%', '90%' ],
	// 			data: buildTreeData(chart, dataset)
	// 		} ]
	// 	};
	// }
};
