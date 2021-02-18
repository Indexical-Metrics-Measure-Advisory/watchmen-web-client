import { ChartType } from '../chart-types';
import { ChartDef } from './chart-def-types';

// interface Legend {
// 	name: string;
// 	rows: Array<ConsoleSpaceSubjectChartDataSetRow>
// }
//
// const buildLegends = (chart: ConsoleSpaceSubjectChart, space: ConsoleSpace, dataset: ConsoleSpaceSubjectChartDataSet) => {
// 	const { dimensions } = chart;
//
// 	const dimensionColumnIndexOffset = getDimensionColumnIndexOffset(chart);
//
// 	if (dimensions.length === 1) {
// 		// only one dimension, use as xAxis. legend is not needed.
// 		// still build as legend for later logic
// 		const factor = findFactorByDimension(space, dimensions[0]);
// 		return [ {
// 			name: factor.label || factor.name,
// 			rows: dataset.data
// 		} ];
// 	} else {
// 		// multiple dimensions, first as legends, second as xAxis
// 		const legendMap = new Map<string, number>();
// 		return dataset.data.reduce<Array<Legend>>((legends, row) => {
// 			// values of first dimension as legends
// 			const dimensionValue = `${row[dimensionColumnIndexOffset]}`;
// 			const legendIndex = legendMap.get(dimensionValue);
// 			if (legendIndex == null) {
// 				legends.push({ name: dimensionValue, rows: [ row ] });
// 				legendMap.set(dimensionValue, legends.length - 1);
// 			} else {
// 				legends[legendIndex].rows.push(row);
// 			}
// 			return legends;
// 		}, []);
// 	}
// };
// const findExtremum = (dataset: ConsoleSpaceSubjectChartDataSet, columnIndex: number) => {
// 	return dataset.data.reduce((extremum, row) => {
// 		const value = row[columnIndex];
// 		if (value > extremum.max) {
// 			extremum.max = value;
// 		}
// 		if (value < extremum.min) {
// 			extremum.min = value;
// 		}
// 		return extremum;
// 	}, { max: -Infinity, min: Infinity });
// };

export const SCATTER: ChartDef = {
	type: ChartType.SCATTER,
	minDimensionCount: 1,
	maxDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 3,
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
