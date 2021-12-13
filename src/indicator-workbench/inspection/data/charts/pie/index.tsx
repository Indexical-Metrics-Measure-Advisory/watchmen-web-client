import {RowOfAny} from '@/services/data/types';
import {buildAriaOptions, buildColumnIndexMap, isColumnIndexAssigned} from '../chart-utils';
import {ChartParams} from '../types';
import {buildBucketOnNames, buildSingleMeasureNames, buildTimeGroupingNames} from './utils';

const formatter = new Intl.NumberFormat(undefined, {useGrouping: true});
const build = (params: ChartParams) => {
	const {inspection, data, arithmetic} = params;

	const columnIndexMap = buildColumnIndexMap(inspection, arithmetic);

	if (isColumnIndexAssigned(columnIndexMap.bucketOn) && isColumnIndexAssigned(columnIndexMap.timeGrouping)) {
		// 2 measures
		const timeGroupingNames = buildTimeGroupingNames(data, columnIndexMap);
		const bucketOnNames = buildBucketOnNames(data, columnIndexMap);

		return {
			tooltip: {trigger: 'item'},
			series: {
				type: 'sunburst',
				radius: [0, '62%'],
				itemStyle: {borderColor: '#fff', borderWidth: 2},
				data: timeGroupingNames.data.map(timeGroup => {
					return {
						name: timeGroup,
						children: bucketOnNames.data.map(bucketOn => {
							const row = data.find((row: RowOfAny) => {
								// eslint-disable-next-line
								return row[timeGroupingNames.columnIndex] == timeGroup && row[bucketOnNames.columnIndex] == bucketOn;
							});
							const value = row == null ? null : row[columnIndexMap.value];
							return {name: bucketOn, children: [{name: '', value}]};
						})
					};
				}),
				levels: [
					{},
					{r0: 0, r: '25%'},
					{r0: '25%', r: '60%'},
					{
						r0: '60%', r: '62%',
						label: {
							position: 'outside',
							formatter: ({data: {value}}: any) => {
								const v = Number(value);
								return isNaN(v) ? value : formatter.format(v);
							}
						}
					}
				]
			},
			...buildAriaOptions()
		};
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
					const row = data.find((row: RowOfAny) => row[singleMeasureNames.columnIndex] == name);
					const value = row == null ? null : row[columnIndexMap.value];
					return {name, value};
				})
			}],
			...buildAriaOptions()
		};
	}
};

export const pieBuild = build;