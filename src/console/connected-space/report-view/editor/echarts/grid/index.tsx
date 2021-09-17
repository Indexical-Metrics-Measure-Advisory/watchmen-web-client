import {
	isDoughnutChart,
	isMapChart,
	isNightingaleChart,
	isPieChart,
	isSunburstChart,
	isTreeChart,
	isTreemapChart
} from '@/services/data/tuples/chart-utils';
import {canUseGrid, isEChart} from '@/services/data/tuples/echarts/echarts-utils';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {onBooleanChange, onColorChange} from '../../data-utils';
import {TabBodySection, TabBodySectionBody, TabBodySectionTitle} from '../../dataset-and-palette/widget';
import {EChartsGridPropNames} from '../../prop-defs/echart-styles/echarts-grid-props';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {useChartType} from '../../settings-effect/use-chart-type';
import {BooleanValue} from '../../settings-widgets/boolean-value';
import {ColorValue} from '../../settings-widgets/color-value';
import {BorderSettings, SettingsBorderPropNames} from '../border';
import {PositionSettings, SettingsPositionPropNames} from '../position';

export const EChartsGridSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isEChart(chart) || !canUseGrid(chart)) {
		return null;
	}

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_GRID_CHANGED, report);
	};

	const grid = chart.settings?.grid;
	const getGridHolder = () => grid;
	const propNames = {
		border: {
			width: EChartsGridPropNames.BORDER_WIDTH,
			style: EChartsGridPropNames.BORDER_STYLE,
			color: EChartsGridPropNames.BORDER_COLOR
		} as SettingsBorderPropNames,
		position: {
			top: EChartsGridPropNames.POSITION_TOP,
			right: EChartsGridPropNames.POSITION_RIGHT,
			left: EChartsGridPropNames.POSITION_LEFT,
			bottom: EChartsGridPropNames.POSITION_BOTTOM
		} as SettingsPositionPropNames
	};

	const onlyPosition = isPieChart(chart) || isDoughnutChart(chart)
		|| isNightingaleChart(chart) || isSunburstChart(chart)
		|| isTreeChart(chart) || isTreemapChart(chart) || isMapChart(chart);

	return <TabBodySection>
		{onlyPosition ? null : <>
			<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_BASIC}</TabBodySectionTitle>
			<TabBodySectionBody>
				<BooleanValue label={Lang.CHART.SHOW}
				              value={grid?.show} defaultValue={false}
				              onValueChange={onBooleanChange({
					              report,
					              chart,
					              prop: EChartsGridPropNames.SHOW,
					              done: onValueChange
				              })}/>
				<BooleanValue label={Lang.CHART.GRID_CONTAIN_LABEL}
				              value={grid?.containLabel} defaultValue={false}
				              onValueChange={onBooleanChange({
					              report,
					              chart,
					              prop: EChartsGridPropNames.CONTAIN_LABEL,
					              done: onValueChange
				              })}/>
			</TabBodySectionBody>
		</>}
		{onlyPosition ? null : <>
			<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_COLOR}</TabBodySectionTitle>
			<TabBodySectionBody>
				<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
				            value={grid?.backgroundColor}
				            onValueChange={onColorChange({
					            report,
					            chart,
					            prop: EChartsGridPropNames.BACKGROUND_COLOR,
					            done: onValueChange
				            })}/>
			</TabBodySectionBody>
		</>}
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_POSITION}</TabBodySectionTitle>
		<TabBodySectionBody>
			<PositionSettings report={report} chart={chart}
			                  getHolder={getGridHolder}
			                  propNames={propNames.position}
			                  onValueChange={onValueChange}/>
		</TabBodySectionBody>
		{onlyPosition ? null : <>
			<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_BORDER}</TabBodySectionTitle>
			<TabBodySectionBody>
				<BorderSettings report={report} chart={chart}
				                getHolder={getGridHolder}
				                propNames={propNames.border}
				                onValueChange={onValueChange}/>
			</TabBodySectionBody>
		</>}
	</TabBodySection>;
};