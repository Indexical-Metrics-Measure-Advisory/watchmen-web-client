import React from 'react';
import { Lang } from '../../../../../../../langs';
import { PieChartSettingsSeries, PieRoseType } from '../../../../../../../services/tuples/chart-def/chart-pie';
import { ECharts } from '../../../../../../../services/tuples/echarts/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import { onDropdownValueChange, onNumberChange, validateNumber } from '../../data-utils';
import { PieChartStylePropNames, PieRoseTypeOptions } from '../../prop-defs/chart-styles/pie-chart-style-props';
import { DropdownValue } from '../../settings-widgets/dropdown-value';
import { NumberValue } from '../../settings-widgets/number-value';

export interface SettingsPiePropNames {
	centerX: PieChartStylePropNames.CENTER_X;
	centerY: PieChartStylePropNames.CENTER_Y;
	insideRadius: PieChartStylePropNames.INSIDE_RADIUS;
	outsideRadius: PieChartStylePropNames.OUTSIDE_RADIUS;
	roseType: PieChartStylePropNames.ROSE_TYPE;
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
			roseType: roseTypePropName
		},
		defaultRoseType,
		onValueChange
	} = props;

	const holder = getHolder(chart);

	return <>
		<NumberValue label={Lang.CHART.PIE_CENTER_X} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
		             value={holder?.centerX} defaultValue={0}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: centerXPropName,
			             done: onValueChange
		             })}/>
		<NumberValue label={Lang.CHART.PIE_CENTER_Y} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
		             value={holder?.centerY} defaultValue={0}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: centerYPropName,
			             done: onValueChange
		             })}/>
		<NumberValue label={Lang.CHART.PIE_INSIDE_RADIUS} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
		             value={holder?.insideRadius} defaultValue={0}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: insideRadiusPropName,
			             done: onValueChange
		             })}/>
		<NumberValue label={Lang.CHART.PIE_OUTSIDE_RADIUS} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
		             value={holder?.insideRadius} defaultValue={0}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: outsideRadiusPropName,
			             done: onValueChange
		             })}/>
		<DropdownValue label={Lang.CHART.PIE_ROSE_TYPE}
		               value={holder?.roseType} defaultValue={defaultRoseType}
		               options={PieRoseTypeOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: roseTypePropName,
			               done: onValueChange
		               })}/>
	</>;
};