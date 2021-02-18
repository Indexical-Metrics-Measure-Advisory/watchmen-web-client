import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

export const MAP: ChartDef = {
	type: ChartType.MAP,
	minDimensionCount: 1,
	maxDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 3
	// buildOptions: (chart: ConsoleSpaceSubjectChart, space: ConsoleSpace, dataset: ConsoleSpaceSubjectChartDataSet) => {
	// 	const { dimensions, indicators } = chart;
	//
	// 	const dimensionColumnIndexOffset = getDimensionColumnIndexOffset(chart);
	// 	const legends = buildLegends(chart, space, dataset);
	// 	// use last dimension as xAxis
	// 	const xAxisFactor = findFactorByDimension(space, dimensions[dimensions.length - 1]);
	// 	const yAxisFactor = findFactorByIndicator(space, indicators[0]);
	//
	// 	return {
	// 		color: BaseColors24,
	// 		tooltip: {
	// 			trigger: 'item'
	// 		},
	// 		// legend only available on multiple dimensions defined
	// 		legend: legends.length > 1 ? { data: legends.map(({ name }) => name) } : (void 0),
	// 		xAxis: {
	// 			type: 'category',
	// 			name: xAxisFactor.label || xAxisFactor.name
	// 		},
	// 		yAxis: {
	// 			type: 'value',
	// 			name: yAxisFactor.label || yAxisFactor.name
	// 		},
	// 		series: legends.map(({ name, rows }) => {
	// 			return {
	// 				name,
	// 				type: 'scatter',
	// 				data: rows.map(row => {
	// 					return [
	// 						// value of last dimension as xAxis value
	// 						row[dimensions.length - 1 + dimensionColumnIndexOffset],
	// 						// value of first indicator as yAxis value
	// 						// and rest values according to indicators order
	// 						...indicators.map((indicator, index) => row[index])
	// 					];
	// 				})
	// 			};
	// 		}),
	// 		// visual map only available on multiple indicators defined
	// 		visualMap: indicators.length === 1 ? (void 0) : indicators.map((indicator, index) => {
	// 			switch (index) {
	// 				case 0:
	// 					// first indicator is used as yAxis, ignore
	// 					return null;
	// 				case 1:
	// 					// use size to identify difference
	// 					return {
	// 						show: false,
	// 						// index of per data row, first is xAxis(dimension), second is yAxis(first indicator)
	// 						dimension: 2,
	// 						// column index of second indicator is 1
	// 						...findExtremum(dataset, 1),
	// 						inRange: {
	// 							symbolSize: [ 10, 50 ]
	// 						}
	// 					};
	// 				case 2:
	// 					// use opacity to identify difference
	// 					return {
	// 						show: false,
	// 						// index of per data row, first is xAxis(dimension), second is yAxis(first indicator)
	// 						dimension: 2,
	// 						// column index of third indicator is 2
	// 						...findExtremum(dataset, 2),
	// 						inRange: {
	// 							colorAlpha: [ 0.4, 1 ]
	// 						}
	// 					};
	// 				default:
	// 					// more indicators are not supported yet
	// 					return null;
	// 			}
	// 		}).filter(x => !x) as Array<EChartOption.VisualMap>
	// 	};
	// }
};
