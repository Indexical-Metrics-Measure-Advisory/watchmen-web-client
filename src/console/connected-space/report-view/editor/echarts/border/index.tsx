import {ChartBorderStyle} from '@/services/data/tuples/chart-types';
import {EChartsBorderHolder} from '@/services/data/tuples/echarts/echarts-border-type';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {onColorChange, onDropdownValueChange, onNumberChange, validateNumber} from '../../data-utils';
import {BarChartStylePropNames} from '../../prop-defs/chart-styles/bar-chart-style-props';
import {PieChartStylePropNames} from '../../prop-defs/chart-styles/pie-chart-style-props';
import {BorderStyleOptions} from '../../prop-defs/dropdown-options/border-dropdown-options';
import {EChartsGridPropNames} from '../../prop-defs/echart-styles/echarts-grid-props';
import {EChartsLegendPropNames} from '../../prop-defs/echart-styles/echarts-legend-props';
import {EChartsTitlePropNames} from '../../prop-defs/echart-styles/echarts-title-props';
import {EChartsXAxisPropNames} from '../../prop-defs/echart-styles/echarts-xaxis-props';
import {EChartsYAxisPropNames} from '../../prop-defs/echart-styles/echarts-yaxis-props';
import {ColorValue} from '../../settings-widgets/color-value';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {NumberValue} from '../../settings-widgets/number-value';

export interface SettingsBorderPropNames {
	width: EChartsTitlePropNames.TEXT_BORDER_WIDTH
		| EChartsLegendPropNames.BORDER_WIDTH
		| EChartsGridPropNames.BORDER_WIDTH
		| EChartsXAxisPropNames.NAME_BORDER_WIDTH
		| EChartsXAxisPropNames.LABEL_BORDER_WIDTH
		| EChartsYAxisPropNames.NAME_BORDER_WIDTH
		| EChartsYAxisPropNames.LABEL_BORDER_WIDTH
		| PieChartStylePropNames.BORDER_WIDTH
		| PieChartStylePropNames.LABEL_BORDER_WIDTH
		| BarChartStylePropNames.LABEL_BORDER_WIDTH;
	color: EChartsTitlePropNames.TEXT_BORDER_COLOR
		| EChartsLegendPropNames.BORDER_COLOR
		| EChartsGridPropNames.BORDER_COLOR
		| EChartsXAxisPropNames.NAME_BORDER_COLOR
		| EChartsXAxisPropNames.LABEL_BORDER_COLOR
		| EChartsYAxisPropNames.NAME_BORDER_COLOR
		| EChartsYAxisPropNames.LABEL_BORDER_COLOR
		| PieChartStylePropNames.BORDER_COLOR
		| PieChartStylePropNames.LABEL_BORDER_COLOR
		| BarChartStylePropNames.LABEL_BORDER_COLOR;
	style: EChartsTitlePropNames.TEXT_BORDER_STYLE
		| EChartsLegendPropNames.BORDER_STYLE
		| EChartsGridPropNames.BORDER_STYLE
		| EChartsXAxisPropNames.NAME_BORDER_STYLE
		| EChartsXAxisPropNames.LABEL_BORDER_STYLE
		| EChartsYAxisPropNames.NAME_BORDER_STYLE
		| EChartsYAxisPropNames.LABEL_BORDER_STYLE
		| PieChartStylePropNames.BORDER_STYLE
		| PieChartStylePropNames.LABEL_BORDER_STYLE
		| BarChartStylePropNames.LABEL_BORDER_STYLE;
	radius?: EChartsTitlePropNames.TEXT_BORDER_RADIUS
		| EChartsLegendPropNames.BORDER_RADIUS
		| EChartsXAxisPropNames.NAME_BORDER_RADIUS
		| EChartsXAxisPropNames.LABEL_BORDER_RADIUS
		| EChartsYAxisPropNames.NAME_BORDER_RADIUS
		| EChartsYAxisPropNames.LABEL_BORDER_RADIUS
		| PieChartStylePropNames.BORDER_RADIUS
		| PieChartStylePropNames.LABEL_BORDER_RADIUS
		| BarChartStylePropNames.LABEL_BORDER_RADIUS;
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