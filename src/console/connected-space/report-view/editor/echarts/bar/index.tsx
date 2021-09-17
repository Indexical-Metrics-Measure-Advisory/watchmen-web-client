import {BarChartSettingsSeries} from '@/services/data/tuples/chart-def/chart-bar';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {onBooleanChange} from '../../data-utils';
import {BarChartStylePropNames} from '../../prop-defs/chart-styles/bar-chart-style-props';
import {useChartType} from '../../settings-effect/use-chart-type';
import {BooleanValue} from '../../settings-widgets/boolean-value';

export interface SettingsBarPropNames {
	transformAxis: BarChartStylePropNames.TRANSFORM_AXIS;
}

export const BarSettings = (props: {
	report: Report;
	chart: ECharts;
	getHolder: (chart: ECharts) => BarChartSettingsSeries | undefined;
	propNames: SettingsBarPropNames;
	onValueChange: () => void;
}) => {
	const {
		report, chart, getHolder,
		propNames: {
			transformAxis: transformAxisPropName
		},
		onValueChange
	} = props;

	useChartType({report});

	const holder = getHolder(chart);

	return <>
		<BooleanValue label={Lang.CHART.BAR_TRANSFORM_AXIS}
		              value={holder?.transformAxis} defaultValue={false}
		              onValueChange={onBooleanChange({
			              report,
			              chart,
			              prop: transformAxisPropName,
			              done: onValueChange
		              })}/>
	</>;
};