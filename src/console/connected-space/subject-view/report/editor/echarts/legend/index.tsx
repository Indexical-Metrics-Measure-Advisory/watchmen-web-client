import React from 'react';
import { Lang } from '../../../../../../../langs';
import { EchartsLegendOrient } from '../../../../../../../services/tuples/echarts/echarts-legend-types';
import { canHoldLegend, isEChart } from '../../../../../../../services/tuples/echarts/echarts-utils';
import { Report } from '../../../../../../../services/tuples/report-types';
import {
	EChartLegendPropNames,
	LegendOrientOptions,
	onBooleanChange,
	onColorChange,
	onDropdownValueChange,
	onNumberChange,
	validateNumber
} from '../../data-utils';
import { useReportEditEventBus } from '../../report-edit-event-bus';
import { ReportEditEventTypes } from '../../report-edit-event-bus-types';
import { useChartType } from '../../settings-effect/use-chart-type';
import { BooleanValue } from '../../settings-widgets/boolean-value';
import { ColorValue } from '../../settings-widgets/color-value';
import { DropdownValue } from '../../settings-widgets/dropdown-value';
import { NumberValue } from '../../settings-widgets/number-value';
import { Section } from '../../settings-widgets/section';
import { BorderSettings, SettingsBorderPropNames } from '../border';
import { FontSettings, SettingsFontPropNames } from '../font';
import { PositionSettings, SettingsPositionPropNames } from '../position';

export const EChartsLegendSettings = (props: { report: Report }) => {
	const { report } = props;
	const { chart } = report;

	const { fire } = useReportEditEventBus();
	useChartType({ report });

	if (!isEChart(chart) || !canHoldLegend(chart)) {
		return null;
	}

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_LEGEND_CHANGED, report);
	};

	const legend = chart.settings?.legend;
	const getLegendHolder = () => legend;
	const propNames = {
		font: {
			family: EChartLegendPropNames.FONT_FAMILY,
			size: EChartLegendPropNames.FONT_SIZE,
			weight: EChartLegendPropNames.FONT_WEIGHT,
			color: EChartLegendPropNames.FONT_COLOR,
			style: EChartLegendPropNames.FONT_STYLE
		} as SettingsFontPropNames,
		border: {
			width: EChartLegendPropNames.BORDER_WIDTH,
			style: EChartLegendPropNames.BORDER_STYLE,
			color: EChartLegendPropNames.BORDER_COLOR,
			radius: EChartLegendPropNames.BORDER_RADIUS
		} as SettingsBorderPropNames,
		position: {
			top: EChartLegendPropNames.POSITION_TOP,
			right: EChartLegendPropNames.POSITION_RIGHT,
			left: EChartLegendPropNames.POSITION_LEFT,
			bottom: EChartLegendPropNames.POSITION_BOTTOM
		} as SettingsPositionPropNames
	};

	return <Section title={Lang.CHART.SECTION_TITLE_ECHART_LEGEND}>
		<BooleanValue label={Lang.CHART.SHOW}
		              value={legend?.show} defaultValue={false}
		              onValueChange={onBooleanChange({
			              report,
			              chart,
			              prop: EChartLegendPropNames.SHOW,
			              done: onValueChange
		              })}/>
		<DropdownValue label={Lang.CHART.LEGEND_ORIENT}
		               value={legend?.orient} defaultValue={EchartsLegendOrient.HORIZONTAL}
		               options={LegendOrientOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: EChartLegendPropNames.ORIENT,
			               done: onValueChange
		               })}/>
		<FontSettings report={report} chart={chart}
		              getHolder={getLegendHolder}
		              propNames={propNames.font}
		              onValueChange={onValueChange}/>
		<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
		            value={legend?.backgroundColor}
		            onValueChange={onColorChange({
			            report,
			            chart,
			            prop: EChartLegendPropNames.BACKGROUND_COLOR,
			            done: onValueChange
		            })}/>
		<PositionSettings report={report} chart={chart}
		                  getHolder={getLegendHolder}
		                  propNames={propNames.position}
		                  onValueChange={onValueChange}/>
		<BorderSettings report={report} chart={chart}
		                getHolder={getLegendHolder}
		                propNames={propNames.border}
		                onValueChange={onValueChange}/>
		<NumberValue label={Lang.CHART.PADDING} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
		             value={legend?.padding} defaultValue={0}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: EChartLegendPropNames.PADDING,
			             done: onValueChange
		             })}/>
	</Section>;
};