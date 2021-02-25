import React from 'react';
import { Lang } from '../../../../../../../langs';
import { canUseGrid, isEChart } from '../../../../../../../services/tuples/echarts/echarts-utils';
import { Report } from '../../../../../../../services/tuples/report-types';
import { EChartGridPropNames, onBooleanChange, onColorChange } from '../../data-utils';
import { useReportEditEventBus } from '../../report-edit-event-bus';
import { ReportEditEventTypes } from '../../report-edit-event-bus-types';
import { useChartType } from '../../settings-effect/use-chart-type';
import { BooleanValue } from '../../settings-widgets/boolean-value';
import { ColorValue } from '../../settings-widgets/color-value';
import { Section } from '../../settings-widgets/section';
import { BorderSettings, SettingsBorderPropNames } from '../border';
import { PositionSettings, SettingsPositionPropNames } from '../position';

export const EChartsGridSettings = (props: { report: Report }) => {
	const { report } = props;
	const { chart } = report;

	const { fire } = useReportEditEventBus();
	useChartType({ report });

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
			width: EChartGridPropNames.BORDER_WIDTH,
			style: EChartGridPropNames.BORDER_STYLE,
			color: EChartGridPropNames.BORDER_COLOR
		} as SettingsBorderPropNames,
		position: {
			top: EChartGridPropNames.POSITION_TOP,
			right: EChartGridPropNames.POSITION_RIGHT,
			left: EChartGridPropNames.POSITION_LEFT,
			bottom: EChartGridPropNames.POSITION_BOTTOM
		} as SettingsPositionPropNames
	};

	return <Section title={Lang.CHART.SECTION_TITLE_ECHART_GRID}>
		<BooleanValue label={Lang.CHART.SHOW}
		              value={grid?.show} defaultValue={false}
		              onValueChange={onBooleanChange({
			              report,
			              chart,
			              prop: EChartGridPropNames.SHOW,
			              done: onValueChange
		              })}/>
		<BooleanValue label={Lang.CHART.GRID_CONTAIN_LABEL}
		              value={grid?.containLabel} defaultValue={false}
		              onValueChange={onBooleanChange({
			              report,
			              chart,
			              prop: EChartGridPropNames.CONTAIN_LABEL,
			              done: onValueChange
		              })}/>
		<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
		            value={grid?.backgroundColor}
		            onValueChange={onColorChange({
			            report,
			            chart,
			            prop: EChartGridPropNames.BACKGROUND_COLOR,
			            done: onValueChange
		            })}/>
		<PositionSettings report={report} chart={chart}
		                  getHolder={getGridHolder}
		                  propNames={propNames.position}
		                  onValueChange={onValueChange}/>
		<BorderSettings report={report} chart={chart}
		                getHolder={getGridHolder}
		                propNames={propNames.border}
		                onValueChange={onValueChange}/>
	</Section>;
};