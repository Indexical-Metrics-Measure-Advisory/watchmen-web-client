import {
	EChartsAxisMinorSplitLineHolder,
	EChartsAxisSplitLine,
	EChartsAxisSplitLineHolder,
	EChartsAxisSplitLineStyle
} from '@/services/data/tuples/echarts/echarts-axis-split-line-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {onBooleanChange, onColorChange, onDropdownValueChange, onNumberChange, validateNumber} from '../../data-utils';
import {TabBodySectionBody, TabBodySectionTitle} from '../../dataset-and-palette/widget';
import {AxisSplitLineStyleOptions} from '../../prop-defs/dropdown-options/axis-dropdown-options';
import {EChartsXAxisPropNames} from '../../prop-defs/echart-styles/echarts-xaxis-props';
import {EChartsYAxisPropNames} from '../../prop-defs/echart-styles/echarts-yaxis-props';
import {BooleanValue} from '../../settings-widgets/boolean-value';
import {ColorValue} from '../../settings-widgets/color-value';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {NumberValue} from '../../settings-widgets/number-value';

export interface SettingsAxisSplitLinePropNames {
	show: EChartsXAxisPropNames.SPLIT_LINE_SHOW
		| EChartsXAxisPropNames.MINOR_SPLIT_LINE_SHOW
		| EChartsYAxisPropNames.SPLIT_LINE_SHOW
		| EChartsYAxisPropNames.MINOR_SPLIT_LINE_SHOW,
	color: EChartsXAxisPropNames.SPLIT_LINE_COLOR
		| EChartsXAxisPropNames.MINOR_SPLIT_LINE_COLOR
		| EChartsYAxisPropNames.SPLIT_LINE_COLOR
		| EChartsYAxisPropNames.MINOR_SPLIT_LINE_COLOR,
	width: EChartsXAxisPropNames.SPLIT_LINE_WIDTH
		| EChartsXAxisPropNames.MINOR_SPLIT_LINE_WIDTH
		| EChartsYAxisPropNames.SPLIT_LINE_WIDTH
		| EChartsYAxisPropNames.MINOR_SPLIT_LINE_WIDTH,
	style: EChartsXAxisPropNames.SPLIT_LINE_STYLE
		| EChartsXAxisPropNames.MINOR_SPLIT_LINE_STYLE
		| EChartsYAxisPropNames.SPLIT_LINE_STYLE
		| EChartsYAxisPropNames.MINOR_SPLIT_LINE_STYLE
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
	const {report, chart, getHolder, getSplitLine, title, defaultShow, propNames, onValueChange} = props;

	const holder = getHolder(chart);
	const splitLine = getSplitLine(holder);

	return <>
		<TabBodySectionTitle>{title}</TabBodySectionTitle>
		<TabBodySectionBody>
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
		</TabBodySectionBody>
	</>;
};