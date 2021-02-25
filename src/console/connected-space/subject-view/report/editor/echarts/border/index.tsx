import React from 'react';
import { Lang } from '../../../../../../../langs';
import { ChartBorderStyle } from '../../../../../../../services/tuples/chart-types';
import { EChartsBorderHolder } from '../../../../../../../services/tuples/echarts/echarts-border-type';
import { ECharts } from '../../../../../../../services/tuples/echarts/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import {
	BorderStyleOptions,
	EChartGridPropNames,
	EChartLegendPropNames,
	EChartTitlePropNames,
	EChartXAxisPropNames,
	onColorChange,
	onDropdownValueChange,
	onNumberChange,
	validateNumber
} from '../../data-utils';
import { ColorValue } from '../../settings-widgets/color-value';
import { DropdownValue } from '../../settings-widgets/dropdown-value';
import { NumberValue } from '../../settings-widgets/number-value';

export interface SettingsBorderPropNames {
	width: EChartTitlePropNames.TEXT_BORDER_WIDTH
		| EChartLegendPropNames.BORDER_WIDTH
		| EChartGridPropNames.BORDER_WIDTH
		| EChartXAxisPropNames.NAME_BORDER_WIDTH
		| EChartXAxisPropNames.LABEL_BORDER_WIDTH;
	color: EChartTitlePropNames.TEXT_BORDER_COLOR
		| EChartLegendPropNames.BORDER_COLOR
		| EChartGridPropNames.BORDER_COLOR
		| EChartXAxisPropNames.NAME_BORDER_COLOR
		| EChartXAxisPropNames.LABEL_BORDER_COLOR;
	style: EChartTitlePropNames.TEXT_BORDER_STYLE
		| EChartLegendPropNames.BORDER_STYLE
		| EChartGridPropNames.BORDER_STYLE
		| EChartXAxisPropNames.NAME_BORDER_STYLE
		| EChartXAxisPropNames.LABEL_BORDER_STYLE;
	radius?: EChartTitlePropNames.TEXT_BORDER_RADIUS
		| EChartLegendPropNames.BORDER_RADIUS
		| EChartXAxisPropNames.NAME_BORDER_RADIUS
		| EChartXAxisPropNames.LABEL_BORDER_RADIUS;
}

export const BorderSettings = (props: {
	report: Report;
	chart: ECharts;
	getHolder: (chart: ECharts) => EChartsBorderHolder | undefined;
	propNames: SettingsBorderPropNames;
	onValueChange: () => void;
}) => {
	const {
		report, chart, getHolder,
		propNames: {
			width: borderWidthPropName,
			color: borderColorPropName,
			style: borderStylePropName,
			radius: borderRadiusPropName
		},
		onValueChange
	} = props;

	const holder = getHolder(chart);

	return <>
		<NumberValue label={Lang.CHART.BORDER_WIDTH} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 999'}
		             value={holder?.border?.width} defaultValue={0}
		             validate={validateNumber(3)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: borderWidthPropName,
			             done: onValueChange
		             })}/>
		<ColorValue label={Lang.CHART.BORDER_COLOR}
		            value={holder?.border?.color}
		            onValueChange={onColorChange({
			            report,
			            chart,
			            prop: borderColorPropName,
			            done: onValueChange
		            })}/>
		<DropdownValue label={Lang.CHART.BORDER_STYLE}
		               value={holder?.border?.style} defaultValue={ChartBorderStyle.NONE}
		               options={BorderStyleOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: borderStylePropName,
			               done: onValueChange
		               })}/>
		{borderRadiusPropName
			? <NumberValue label={Lang.CHART.BORDER_RADIUS} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
			               value={holder?.border?.radius} defaultValue={0}
			               validate={validateNumber(4)}
			               onValueChange={onNumberChange({
				               report,
				               chart,
				               prop: borderRadiusPropName,
				               done: onValueChange
			               })}/>
			: null}
	</>;
};