import {buildAriaOptions, buildColumnIndexMap, isColumnIndexAssigned} from '../chart-utils';
import {createChartComponent} from '../widgets/chart';
import {buildSingleMeasureNames} from './utils';

const formatter = new Intl.NumberFormat(undefined, {useGrouping: true});
export const Pie = createChartComponent(params => {
	const {inspection, data, arithmetic} = params;

	const columnIndexMap = buildColumnIndexMap(inspection, arithmetic);

	if (isColumnIndexAssigned(columnIndexMap.bucketOn) && isColumnIndexAssigned(columnIndexMap.timeGrouping)) {
		// 2 measures
	} else {
		// only 1 measures
		const singleMeasureNames = buildSingleMeasureNames(data, columnIndexMap);

		return {
			tooltip: {trigger: 'item'},
			legend: {top: '5%'},
			series: [{
				type: 'pie',
				radius: [0, '60%'],
				center: ['50%', '55%'],
				avoidLabelOverlap: false,
				itemStyle: {borderRadius: 10, borderColor: '#fff', borderWidth: 4},
				label: {
					show: true,
					position: 'outside',
					alignTo: 'edge',
					minMargin: 5,
					edgeDistance: 10,
					lineHeight: 15,
					formatter: ({data: {name, value}, percent}: any) => {
						const v = Number(value);
						return `${name}\n${isNaN(v) ? value : formatter.format(v)}, ${percent}%`;
					}
				},
				labelLine: {
					length: 25,
					length2: 0,
					maxSurfaceAngle: 80
				},
				labelLayout: (params: any) => {
					const isLeft = params.labelRect.x <= 50;
					const points = params.labelLinePoints;
					// Update the end point.
					points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width;
					return {labelLinePoints: points};
				},
				data: singleMeasureNames.data.map(name => {
					// eslint-disable-next-line
					const row = data.find(row => row[singleMeasureNames.columnIndex] == name);
					const value = row == null ? null : row[columnIndexMap.value];
					return {name, value};
				})
			}],
			...buildAriaOptions()
		};
	}
});