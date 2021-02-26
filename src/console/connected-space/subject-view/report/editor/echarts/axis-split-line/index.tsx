import React from 'react';
import { Lang } from '../../../../../../../langs';
import {
	EChartsAxisMinorSplitLineHolder,
	EChartsAxisSplitLine,
	EChartsAxisSplitLineHolder,
	EChartsAxisSplitLineStyle
} from '../../../../../../../services/tuples/echarts/echarts-axis-split-line-types';
import { ECharts } from '../../../../../../../services/tuples/echarts/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import {
	AxisSplitLineStyleOptions,
	EChartXAxisPropNames,
	EChartYAxisPropNames,
	onBooleanChange,
	onColorChange,
	onDropdownValueChange,
	onNumberChange,
	validateNumber
} from '../../data-utils';
import { BooleanValue } from '../../settings-widgets/boolean-value';
import { ColorValue } from '../../settings-widgets/color-value';
import { DropdownValue } from '../../settings-widgets/dropdown-value';
import { NumberValue } from '../../settings-widgets/number-value';
import { Section } from '../../settings-widgets/section';

export interface SettingsAxisSplitLinePropNames {
	show: EChartXAxisPropNames.SPLIT_LINE_SHOW
		| EChartXAxisPropNames.MINOR_SPLIT_LINE_SHOW
		| EChartYAxisPropNames.SPLIT_LINE_SHOW
		| EChartYAxisPropNames.MINOR_SPLIT_LINE_SHOW,
	color: EChartXAxisPropNames.SPLIT_LINE_COLOR
		| EChartXAxisPropNames.MINOR_SPLIT_LINE_COLOR
		| EChartYAxisPropNames.SPLIT_LINE_COLOR
		| EChartYAxisPropNames.MINOR_SPLIT_LINE_COLOR,
	width: EChartXAxisPropNames.SPLIT_LINE_WIDTH
		| EChartXAxisPropNames.MINOR_SPLIT_LINE_WIDTH
		| EChartYAxisPropNames.SPLIT_LINE_WIDTH
		| EChartYAxisPropNames.MINOR_SPLIT_LINE_WIDTH,
	style: EChartXAxisPropNames.SPLIT_LINE_STYLE
		| EChartXAxisPropNames.MINOR_SPLIT_LINE_STYLE
		| EChartYAxisPropNames.SPLIT_LINE_STYLE
		| EChartYAxisPropNames.MINOR_SPLIT_LINE_STYLE
}

export const EChartsAxisSplitLineSettings = (props: {
	report: Report;
	chart: ECharts;
	getHolder: (chart: ECharts) => EChartsAxisSplitLineHolder | EChartsAxisMinorSplitLineHolder | undefined;
	getSplitLine: (holder: EChartsAxisSplitLineHolder | EChartsAxisMinorSplitLineHolder | undefined) => EChartsAxisSplitLine | undefined;
	title: string;
	defaultShow: boolean;
	propNames: SettingsAxisSplitLinePropNames;
	onValueChange: () => void;
}) => {
	const { report, chart, getHolder, getSplitLine, title, defaultShow, propNames, onValueChange } = props;

	const holder = getHolder(chart);
	const splitLine = getSplitLine(holder);

	return <Section title={title}>
		<BooleanValue label={Lang.CHART.SHOW}
		              value={splitLine?.show} defaultValue={defaultShow}
		              onValueChange={onBooleanChange({
			              report,
			              chart,
			              prop: propNames.show,
			              done: onValueChange
		              })}/>
		<ColorValue label={Lang.CHART.LINE_COLOR}
		            value={splitLine?.color}
		            onValueChange={onColorChange({
			            report,
			            chart,
			            prop: propNames.color,
			            done: onValueChange
		            })}/>
		<NumberValue label={Lang.CHART.WIDTH} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 999'}
		             value={splitLine?.width} defaultValue={0}
		             validate={validateNumber(3)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: propNames.width,
			             done: onValueChange
		             })}/>
		<DropdownValue label={Lang.CHART.LINE_STYLE}
		               value={splitLine?.style} defaultValue={EChartsAxisSplitLineStyle.SOLID}
		               options={AxisSplitLineStyleOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: propNames.style,
			               done: onValueChange
		               })}/>
	</Section>;
};