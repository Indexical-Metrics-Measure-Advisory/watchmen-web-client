import {EChartsPositionHolder} from '@/services/data/tuples/echarts/echarts-position-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {onPercentageChange, validatePercentage} from '../../data-utils';
import {MapChartStylePropNames} from '../../prop-defs/chart-styles/map-chart-style-props';
import {PieChartStylePropNames} from '../../prop-defs/chart-styles/pie-chart-style-props';
import {TreeChartStylePropNames} from '../../prop-defs/chart-styles/tree-chart-style-props';
import {TreemapChartStylePropNames} from '../../prop-defs/chart-styles/treemap-chart-style-props';
import {EChartsGridPropNames} from '../../prop-defs/echart-styles/echarts-grid-props';
import {EChartsLegendPropNames} from '../../prop-defs/echart-styles/echarts-legend-props';
import {EChartsTitlePropNames} from '../../prop-defs/echart-styles/echarts-title-props';
import {EChartsTooltipPropNames} from '../../prop-defs/echart-styles/echarts-tooltip-props';
import {PercentageValue} from '../../settings-widgets/pecentage-value';

export interface SettingsPositionPropNames {
	top: EChartsTitlePropNames.POSITION_TOP
		| EChartsLegendPropNames.POSITION_TOP
		| EChartsGridPropNames.POSITION_TOP
		| TreeChartStylePropNames.POSITION_TOP
		| TreemapChartStylePropNames.POSITION_TOP
		| PieChartStylePropNames.POSITION_TOP
		| MapChartStylePropNames.POSITION_TOP
		| EChartsTooltipPropNames.POSITION_TOP;
	right: EChartsTitlePropNames.POSITION_RIGHT
		| EChartsLegendPropNames.POSITION_RIGHT
		| EChartsGridPropNames.POSITION_RIGHT
		| TreeChartStylePropNames.POSITION_RIGHT
		| TreemapChartStylePropNames.POSITION_RIGHT
		| PieChartStylePropNames.POSITION_RIGHT
		| MapChartStylePropNames.POSITION_RIGHT
		| EChartsTooltipPropNames.POSITION_RIGHT;
	left: EChartsTitlePropNames.POSITION_LEFT
		| EChartsLegendPropNames.POSITION_LEFT
		| EChartsGridPropNames.POSITION_LEFT
		| TreeChartStylePropNames.POSITION_LEFT
		| TreemapChartStylePropNames.POSITION_LEFT
		| PieChartStylePropNames.POSITION_LEFT
		| MapChartStylePropNames.POSITION_LEFT
		| EChartsTooltipPropNames.POSITION_LEFT;
	bottom: EChartsTitlePropNames.POSITION_BOTTOM
		| EChartsLegendPropNames.POSITION_BOTTOM
		| EChartsGridPropNames.POSITION_BOTTOM
		| TreeChartStylePropNames.POSITION_BOTTOM
		| TreemapChartStylePropNames.POSITION_BOTTOM
		| PieChartStylePropNames.POSITION_BOTTOM
		| MapChartStylePropNames.POSITION_BOTTOM
		| EChartsTooltipPropNames.POSITION_BOTTOM;
}

export const PositionSettings = (props: {
	report: Report;
	chart: ECharts;
	getHolder: (chart: ECharts) => EChartsPositionHolder | undefined;
	propNames: SettingsPositionPropNames;
	onValueChange: () => void;
}) => {
	const {
		report, chart, getHolder,
		propNames: {
			top: posTopPropName,
			right: posRightPropName,
			left: posLeftPropName,
			bottom: posBottomPropName
		},
		onValueChange
	} = props;

	const holder = getHolder(chart);

	const editors = [
		{label: Lang.CHART.POSITION_TOP, name: posTopPropName, value: holder?.position?.top},
		{label: Lang.CHART.POSITION_LEFT, name: posLeftPropName, value: holder?.position?.left},
		{label: Lang.CHART.POSITION_RIGHT, name: posRightPropName, value: holder?.position?.right},
		{label: Lang.CHART.POSITION_BOTTOM, name: posBottomPropName, value: holder?.position?.bottom}
	];

	return <>
		{editors.map(({name, label, value}) => {
			return <PercentageValue label={label} unitLabel={Lang.CHART.PERCENTAGE}
			                        placeholder={'0 - 100%'}
			                        value={value}
			                        validate={validatePercentage}
			                        onValueChange={onPercentageChange({
				                        report,
				                        chart,
				                        prop: name,
				                        done: onValueChange
			                        })}
			                        key={name}/>;

		})}
	</>;
};