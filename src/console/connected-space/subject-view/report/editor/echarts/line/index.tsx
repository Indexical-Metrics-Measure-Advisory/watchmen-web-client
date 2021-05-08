import React from 'react';
import {Lang} from '../../../../../../../langs';
import {LineChartSettingsSeries} from '../../../../../../../services/tuples/chart-def/chart-line';
import {isLineChart} from '../../../../../../../services/tuples/chart-utils';
import {ECharts} from '../../../../../../../services/tuples/echarts/echarts-types';
import {Report} from '../../../../../../../services/tuples/report-types';
import {onBooleanChange} from '../../data-utils';
import {LineChartStylePropNames} from '../../prop-defs/chart-styles/line-chart-style-props';
import {useChartType} from '../../settings-effect/use-chart-type';
import {BooleanValue} from '../../settings-widgets/boolean-value';

export interface SettingsLinePropNames {
	smooth: LineChartStylePropNames.SMOOTH;
}

export const LineSettings = (props: {
	report: Report;
	chart: ECharts;
	getHolder: (chart: ECharts) => LineChartSettingsSeries | undefined;
	propNames: SettingsLinePropNames;
	onValueChange: () => void;
}) => {
	const {
		report, chart, getHolder,
		propNames: {
			smooth: smoothPropName
		},
		onValueChange
	} = props;

	useChartType({report});

	if (!isLineChart(chart)) {
		return null;
	}

	const holder = getHolder(chart);

	return <>
		<BooleanValue label={Lang.CHART.LINE_SMOOTH}
		              value={holder?.transformAxis} defaultValue={false}
		              onValueChange={onBooleanChange({
			              report,
			              chart,
			              prop: smoothPropName,
			              done: onValueChange
		              })}/>
	</>;
};