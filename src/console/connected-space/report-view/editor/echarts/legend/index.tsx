import React from 'react';
import {Lang} from '../../../../../../langs';
import {EChartsLegendOrient} from '../../../../../../services/tuples/echarts/echarts-legend-types';
import {canHoldLegend, isEChart} from '../../../../../../services/tuples/echarts/echarts-utils';
import {Report} from '../../../../../../services/tuples/report-types';
import {onBooleanChange, onColorChange, onDropdownValueChange, onNumberChange, validateNumber} from '../../data-utils';
import {EChartsLegendPropNames, LegendOrientOptions} from '../../prop-defs/echart-styles/echarts-legend-props';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {useChartType} from '../../settings-effect/use-chart-type';
import {BooleanValue} from '../../settings-widgets/boolean-value';
import {ColorValue} from '../../settings-widgets/color-value';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {NumberValue} from '../../settings-widgets/number-value';
import {Section} from '../../settings-widgets/section';
import {BorderSettings, SettingsBorderPropNames} from '../border';
import {FontSettings, SettingsFontPropNames} from '../font';
import {PositionSettings, SettingsPositionPropNames} from '../position';

export const EChartsLegendSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

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
			family: EChartsLegendPropNames.FONT_FAMILY,
			size: EChartsLegendPropNames.FONT_SIZE,
			weight: EChartsLegendPropNames.FONT_WEIGHT,
			color: EChartsLegendPropNames.FONT_COLOR,
			style: EChartsLegendPropNames.FONT_STYLE
		} as SettingsFontPropNames,
		border: {
			width: EChartsLegendPropNames.BORDER_WIDTH,
			style: EChartsLegendPropNames.BORDER_STYLE,
			color: EChartsLegendPropNames.BORDER_COLOR,
			radius: EChartsLegendPropNames.BORDER_RADIUS
		} as SettingsBorderPropNames,
		position: {
			top: EChartsLegendPropNames.POSITION_TOP,
			right: EChartsLegendPropNames.POSITION_RIGHT,
			left: EChartsLegendPropNames.POSITION_LEFT,
			bottom: EChartsLegendPropNames.POSITION_BOTTOM
		} as SettingsPositionPropNames
	};

	return <Section title={Lang.CHART.SECTION_TITLE_ECHART_LEGEND}>
		<BooleanValue label={Lang.CHART.SHOW}
		              value={legend?.show} defaultValue={false}
		              onValueChange={onBooleanChange({
			              report,
			              chart,
			              prop: EChartsLegendPropNames.SHOW,
			              done: onValueChange
		              })}/>
		<DropdownValue label={Lang.CHART.LEGEND_ORIENT}
		               value={legend?.orient} defaultValue={EChartsLegendOrient.HORIZONTAL}
		               options={LegendOrientOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: EChartsLegendPropNames.ORIENT,
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
			            prop: EChartsLegendPropNames.BACKGROUND_COLOR,
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
			             prop: EChartsLegendPropNames.PADDING,
			             done: onValueChange
		             })}/>
	</Section>;
};