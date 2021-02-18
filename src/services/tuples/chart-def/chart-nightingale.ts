import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const NIGHTINGALE: ChartDef = {
	type: ChartType.NIGHTINGALE,
	minDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1,
	// buildOptions: (chart: ConsoleSpaceSubjectChart, space: ConsoleSpace, dataset: ConsoleSpaceSubjectChartDataSet) => {
	// 	// only one indicator allowed
	// 	const { indicators: [ indicator ] } = chart;
	//
	// 	const groups = buildDescartesByDimensions(chart, dataset);
	// 	const factor = findFactorByIndicator(space, indicator);
	//
	// 	return {
	// 		color: BaseColors24,
	// 		tooltip: {
	// 			trigger: 'item'
	// 		},
	// 		legend: { data: groups.map(({ value }) => value) },
	// 		series: [ {
	// 			name: factor.label || factor.name,
	// 			type: 'pie',
	// 			roseType: 'area',
	// 			center: [ '50%', '50%' ],
	// 			data: groups.map(({ value, row }) => {
	// 				return {
	// 					name: value,
	// 					value: formatNumber(row[0] || 0)
	// 				};
	// 			})
	// 		} ]
	// 	};
	// }
};