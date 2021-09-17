import {isCountChart} from '@/services/data/tuples/chart-utils';
import {EChartsToolboxHolder, EChartsToolboxOrient} from '@/services/data/tuples/echarts/echarts-toolbox-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {onBooleanChange, onDropdownValueChange} from '../data-utils';
import {PositionSettings, SettingsPositionPropNames} from '../echarts/position';
import {EChartsTooltipPropNames, ToolboxOrientOptions} from '../prop-defs/echart-styles/echarts-tooltip-props';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {BooleanValue} from '../settings-widgets/boolean-value';
import {DropdownValue} from '../settings-widgets/dropdown-value';
import {Section} from '../settings-widgets/section';

export const ToolboxSection = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (isCountChart(chart)) {
		return null;
	}

	const onToolboxValueChange = () => {
		fire(ReportEditEventTypes.TOOLBOX_CHANGED, report);
	};

	const settings = chart.settings as EChartsToolboxHolder;
	const getGridHolder = () => settings?.toolbox;
	const propNames = {
		position: {
			top: EChartsTooltipPropNames.POSITION_TOP,
			right: EChartsTooltipPropNames.POSITION_RIGHT,
			left: EChartsTooltipPropNames.POSITION_LEFT,
			bottom: EChartsTooltipPropNames.POSITION_BOTTOM
		} as SettingsPositionPropNames
	};

	return <Section title={Lang.CHART.SECTION_TITLE_TOOLBOX}>
		<BooleanValue label={Lang.CHART.SHOW}
		              value={settings?.toolbox?.show} defaultValue={false}
		              onValueChange={onBooleanChange({
			              report,
			              chart,
			              prop: EChartsTooltipPropNames.SHOW,
			              done: onToolboxValueChange
		              })}/>
		<DropdownValue label={Lang.CHART.TOOLBOX_ORIENT}
		               value={settings?.toolbox?.orient} defaultValue={EChartsToolboxOrient.HORIZONTAL}
		               options={ToolboxOrientOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: EChartsTooltipPropNames.ORIENT,
			               done: onToolboxValueChange
		               })}/>
		<PositionSettings report={report} chart={chart}
		                  getHolder={getGridHolder}
		                  propNames={propNames.position}
		                  onValueChange={onToolboxValueChange}/>
	</Section>;
};