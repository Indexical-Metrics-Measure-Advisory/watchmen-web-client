import {
	EChartsAlignmentHolder,
	EChartsHorizontalAlignment,
	EChartsVerticalAlignment
} from '@/services/data/tuples/echarts/echarts-alignment-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {onDropdownValueChange} from '../../data-utils';
import {BarChartStylePropNames} from '../../prop-defs/chart-styles/bar-chart-style-props';
import {PieChartStylePropNames} from '../../prop-defs/chart-styles/pie-chart-style-props';
import {
	HorizontalAlignmentOptions,
	VerticalAlignmentOptions
} from '../../prop-defs/dropdown-options/alignment-dropdown-options';
import {EChartsTitlePropNames} from '../../prop-defs/echart-styles/echarts-title-props';
import {EChartsXAxisPropNames} from '../../prop-defs/echart-styles/echarts-xaxis-props';
import {EChartsYAxisPropNames} from '../../prop-defs/echart-styles/echarts-yaxis-props';
import {DropdownValue} from '../../settings-widgets/dropdown-value';

export interface SettingsAlignmentPropNames {
	horizontalAlign: BarChartStylePropNames.LABEL_HORIZONTAL_ALIGN
		| PieChartStylePropNames.LABEL_HORIZONTAL_ALIGN
		| EChartsTitlePropNames.TEXT_HORIZONTAL_ALIGN
		| EChartsXAxisPropNames.NAME_HORIZONTAL_ALIGN
		| EChartsXAxisPropNames.LABEL_HORIZONTAL_ALIGN
		| EChartsYAxisPropNames.NAME_HORIZONTAL_ALIGN
		| EChartsYAxisPropNames.LABEL_HORIZONTAL_ALIGN;

	verticalAlign: BarChartStylePropNames.LABEL_VERTICAL_ALIGN
		| PieChartStylePropNames.LABEL_VERTICAL_ALIGN
		| EChartsTitlePropNames.TEXT_VERTICAL_ALIGN
		| EChartsXAxisPropNames.NAME_VERTICAL_ALIGN
		| EChartsXAxisPropNames.LABEL_VERTICAL_ALIGN
		| EChartsYAxisPropNames.NAME_VERTICAL_ALIGN
		| EChartsYAxisPropNames.LABEL_VERTICAL_ALIGN;
}

export const AlignmentSettings = (props: {
	report: Report;
	chart: ECharts;
	getHolder: (chart: ECharts) => EChartsAlignmentHolder | undefined;
	propNames: SettingsAlignmentPropNames;
	onValueChange: () => void;
}) => {
	const {
		report, chart, getHolder,
		propNames: {
			horizontalAlign: alignPropName,
			verticalAlign: verticalAlignPropName
		},
		onValueChange
	} = props;

	const holder = getHolder(chart);

	return <>
		<DropdownValue label={Lang.CHART.HORIZONTAL_ALIGNMENT}
		               value={holder?.horizontalAlign} defaultValue={EChartsHorizontalAlignment.AUTO}
		               options={HorizontalAlignmentOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: alignPropName,
			               done: onValueChange
		               })}/>
		<DropdownValue label={Lang.CHART.VERTICAL_ALIGNMENT}
		               value={holder?.horizontalAlign} defaultValue={EChartsVerticalAlignment.AUTO}
		               options={VerticalAlignmentOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: verticalAlignPropName,
			               done: onValueChange
		               })}/>
	</>;
};