import React from 'react';
import { Lang } from '../../../../../../../langs';
import { ChartBorderStyle } from '../../../../../../../services/tuples/chart-types';
import { EChart, EChartsBorderHolder } from '../../../../../../../services/tuples/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import { getCurrentTheme } from '../../../../../../../theme/theme-wrapper';
import {
	BorderStyleOptions,
	EChartTitlePropNames,
	onColorChange,
	onDropdownValueChange,
	onNumberChange,
	validateNumber
} from '../../data-utils';
import { ColorValue } from '../../settings-widgets/color-value';
import { DropdownValue } from '../../settings-widgets/dropdown-value';
import { NumberValue } from '../../settings-widgets/number-value';

export interface SettingsBorderPropNames {
	width: EChartTitlePropNames.TEXT_BORDER_WIDTH | EChartTitlePropNames.SUBTEXT_BORDER_WIDTH;
	color: EChartTitlePropNames.TEXT_BORDER_COLOR | EChartTitlePropNames.SUBTEXT_BORDER_COLOR;
	style: EChartTitlePropNames.TEXT_BORDER_STYLE | EChartTitlePropNames.SUBTEXT_BORDER_STYLE;
	radius: EChartTitlePropNames.TEXT_BORDER_RADIUS | EChartTitlePropNames.SUBTEXT_BORDER_RADIUS;
}

export const BorderSettings = (props: {
	report: Report;
	chart: EChart;
	getHolder: (chart: EChart) => EChartsBorderHolder | undefined;
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

	const theme = getCurrentTheme();

	const text = getHolder(chart);

	return <>
		<NumberValue label={Lang.CHART.BORDER_WIDTH} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 999'}
		             value={text?.border?.width}
		             validate={validateNumber(3)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: borderWidthPropName,
			             done: onValueChange
		             })}/>
		<ColorValue label={Lang.CHART.BORDER_COLOR}
		            value={text?.border?.color} defaultValue={theme.borderColor}
		            onValueChange={onColorChange({
			            report,
			            chart,
			            prop: borderColorPropName,
			            done: onValueChange
		            })}/>
		<DropdownValue label={Lang.CHART.BORDER_STYLE}
		               value={text?.border?.style} defaultValue={ChartBorderStyle.NONE}
		               options={BorderStyleOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: borderStylePropName,
			               done: onValueChange
		               })}/>
		<NumberValue label={Lang.CHART.BORDER_RADIUS} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
		             value={text?.border?.radius} defaultValue={0}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: borderRadiusPropName,
			             done: onValueChange
		             })}/>
	</>;
};