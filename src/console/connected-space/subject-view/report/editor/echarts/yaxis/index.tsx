import React from 'react';
import { Lang } from '../../../../../../../langs';
import { canUseYAxis, isEChart } from '../../../../../../../services/tuples/echarts/echarts-utils';
import {
	EChartsYAxisPosition,
	EChartsYAxisType
} from '../../../../../../../services/tuples/echarts/echarts-yaxis-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import { isANumber, onBooleanChange, onDropdownValueChange, onNumberChange } from '../../data-utils';
import { AxisTypeOptions } from '../../prop-defs/dropdown-options/axis-dropdown-options';
import { EChartsYAxisPropNames, YAxisPositionOptions } from '../../prop-defs/echart-styles/echarts-yaxis-props';
import { useReportEditEventBus } from '../../report-edit-event-bus';
import { ReportEditEventTypes } from '../../report-edit-event-bus-types';
import { useChartType } from '../../settings-effect/use-chart-type';
import { BooleanValue } from '../../settings-widgets/boolean-value';
import { DropdownValue } from '../../settings-widgets/dropdown-value';
import { NumberValue } from '../../settings-widgets/number-value';
import { SecondarySection } from '../../settings-widgets/secondary-section';
import { Section } from '../../settings-widgets/section';
import { EChartsYAxisLabelSettings } from './label';
import { EChartsYAxisNameSettings } from './name';
import { EChartsYAxisSplitLineSettings } from './split-line';

export const EChartsYAxisSettings = (props: { report: Report }) => {
	const { report } = props;
	const { chart } = report;

	const { fire } = useReportEditEventBus();
	useChartType({ report });

	if (!isEChart(chart) || !canUseYAxis(chart)) {
		return null;
	}

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_YAXIS_CHANGED, report);
	};

	const yaxis = chart.settings?.yaxis;

	return <>
		<Section title={Lang.CHART.SECTION_TITLE_ECHART_YAXIS}>
			<BooleanValue label={Lang.CHART.SHOW}
			              value={yaxis?.show} defaultValue={true}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: EChartsYAxisPropNames.SHOW,
				              done: onValueChange
			              })}/>
			<DropdownValue label={Lang.CHART.POSITION}
			               value={yaxis?.position} defaultValue={EChartsYAxisPosition.LEFT}
			               options={YAxisPositionOptions}
			               onValueChange={onDropdownValueChange({
				               report,
				               chart,
				               prop: EChartsYAxisPropNames.POSITION,
				               done: onValueChange
			               })}/>
			<DropdownValue label={Lang.CHART.AXIS_TYPE}
			               value={yaxis?.type} defaultValue={EChartsYAxisType.VALUE}
			               options={AxisTypeOptions}
			               onValueChange={onDropdownValueChange({
				               report,
				               chart,
				               prop: EChartsYAxisPropNames.TYPE,
				               done: onValueChange
			               })}/>
			<SecondarySection title={Lang.CHART.SECTION_TITLE_ECHART_YAXIS_RANGE}>
				<BooleanValue label={Lang.CHART.AXIS_AUTO_MIN}
				              value={yaxis?.autoMin} defaultValue={false}
				              onValueChange={onBooleanChange({
					              report,
					              chart,
					              prop: EChartsYAxisPropNames.AUTO_MIN,
					              done: onValueChange
				              })}/>
				<NumberValue label={Lang.CHART.AXIS_MIN}
				             value={yaxis?.min}
				             validate={isANumber}
				             onValueChange={onNumberChange({
					             report,
					             chart,
					             prop: EChartsYAxisPropNames.MIN,
					             done: onValueChange
				             })}/>
				<BooleanValue label={Lang.CHART.AXIS_AUTO_MAX}
				              value={yaxis?.autoMin} defaultValue={false}
				              onValueChange={onBooleanChange({
					              report,
					              chart,
					              prop: EChartsYAxisPropNames.AUTO_MAX,
					              done: onValueChange
				              })}/>
				<NumberValue label={Lang.CHART.AXIS_MAX}
				             value={yaxis?.min}
				             validate={isANumber}
				             onValueChange={onNumberChange({
					             report,
					             chart,
					             prop: EChartsYAxisPropNames.MAX,
					             done: onValueChange
				             })}/>
			</SecondarySection>
			<EChartsYAxisNameSettings report={report} chart={chart}/>
			<EChartsYAxisLabelSettings report={report} chart={chart}/>
			<EChartsYAxisSplitLineSettings report={report} chart={chart}/>
			{/*<EChartsYAxisMinorSplitLineSettings report={report} chart={chart}/>*/}
		</Section>
	</>;
};