import {PieChartSettingsSeries, PieRoseType} from '@/services/data/tuples/chart-def/chart-pie';
import {ChartType} from '@/services/data/tuples/chart-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {onBooleanChange, onDropdownValueChange, onNumberChange, validateNumber} from '../../data-utils';
import {PieChartStylePropNames, PieRoseTypeOptions} from '../../prop-defs/chart-styles/pie-chart-style-props';
import {useChartType} from '../../settings-effect/use-chart-type';
import {BooleanValue} from '../../settings-widgets/boolean-value';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {NumberValue} from '../../settings-widgets/number-value';

export interface SettingsPiePropNames {
	centerX: PieChartStylePropNames.CENTER_X;
	centerY: PieChartStylePropNames.CENTER_Y;
	insideRadius: PieChartStylePropNames.INSIDE_RADIUS;
	outsideRadius: PieChartStylePropNames.OUTSIDE_RADIUS;
	roseType: PieChartStylePropNames.ROSE_TYPE;
	showPercentage: PieChartStylePropNames.SHOW_PERCENTAGE;
}

export const PieSettings = (props: {
	report: Report;
	chart: ECharts;
	getHolder: (chart: ECharts) => PieChartSettingsSeries | undefined;
	propNames: SettingsPiePropNames;
	defaultRoseType: PieRoseType;
	onValueChange: () => void;
}) => {
	const {
		report, chart, getHolder,
		propNames: {
			centerX: centerXPropName,
			centerY: centerYPropName,
			insideRadius: insideRadiusPropName,
			outsideRadius: outsideRadiusPropName,
			roseType: roseTypePropName,
			showPercentage: showPercentagePropName
		},
		defaultRoseType,
		onValueChange
	} = props;

	useChartType({report});

	const holder = getHolder(chart);

	return <>
		{chart.type === ChartType.SUNBURST
			? null
			: <DropdownValue label={Lang.CHART.PIE_ROSE_TYPE}
			                 value={holder?.roseType} defaultValue={defaultRoseType}
			                 options={PieRoseTypeOptions}
			                 onValueChange={onDropdownValueChange({
				                 report,
				                 chart,
				                 prop: roseTypePropName,
				                 done: onValueChange
			                 })}/>}
		<NumberValue label={Lang.CHART.PIE_CENTER_X} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
		             value={holder?.centerX}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: centerXPropName,
			             done: onValueChange
		             })}/>
		<NumberValue label={Lang.CHART.PIE_CENTER_Y} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
		             value={holder?.centerY}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: centerYPropName,
			             done: onValueChange
		             })}/>
		<NumberValue label={Lang.CHART.PIE_INSIDE_RADIUS} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
		             value={holder?.insideRadius}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: insideRadiusPropName,
			             done: onValueChange
		             })}/>
		<NumberValue label={Lang.CHART.PIE_OUTSIDE_RADIUS} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
		             value={holder?.insideRadius}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: outsideRadiusPropName,
			             done: onValueChange
		             })}/>
		{chart.type === ChartType.SUNBURST
			? null
			: <BooleanValue label={Lang.CHART.PIE_SHOW_PERCENTAGE}
			                value={holder?.showPercentage} defaultValue={true}
			                onValueChange={onBooleanChange({
				                report,
				                chart,
				                prop: showPercentagePropName,
				                done: onValueChange
			                })}/>}
	</>;
};