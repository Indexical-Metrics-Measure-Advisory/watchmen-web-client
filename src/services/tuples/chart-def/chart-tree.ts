import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const TREE: ChartDef = {
	type: ChartType.TREE,
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
	// 			type: 'tree',
	// 			top: '2%',
	// 			left: '2%',
	// 			bottom: '2%',
	// 			right: '2%',
	// 			symbolSize: 8,
	// 			label: {
	// 				position: 'right',
	// 				verticalAlign: 'middle',
	// 				align: 'left'
	// 			},
	// 			leaves: {
	// 				label: {
	// 					position: 'left',
	// 					verticalAlign: 'middle',
	// 					align: 'right'
	// 				}
	// 			},
	// 			expandAndCollapse: true,
	// 			data: buildTreeData(chart, dataset)
	// 		} ]
	// 	};
	// }
};
