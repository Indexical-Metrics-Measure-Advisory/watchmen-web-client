import React from 'react';
import { Lang } from '../../../../../../langs';
import { ChartBorderStyle } from '../../../../../../services/tuples/chart-types';
import { Report } from '../../../../../../services/tuples/report-types';
import { getCurrentTheme } from '../../../../../../theme/theme-wrapper';
import {
	onColorChange,
	onDropdownValueChange,
	onNumberChange,
	validateNumber
} from '../data-utils';
import { BorderStyleOptions } from '../prop-defs/dropdown-options/border-dropdown-options';
import { PeripheralStylePropNames } from '../prop-defs/peripheral-style-props';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { ColorValue } from '../settings-widgets/color-value';
import { DropdownValue } from '../settings-widgets/dropdown-value';
import { NumberValue } from '../settings-widgets/number-value';
import { Section } from '../settings-widgets/section';

export const BasicStylesSection = (props: { report: Report }) => {
	const { report } = props;
	const { chart } = report;

	const { fire } = useReportEditEventBus();
	const onValueChange = () => {
		fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
	};
	const theme = getCurrentTheme();

	return <Section title={Lang.CHART.SECTION_TITLE_BASIC_STYLE}>
		<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
		            value={report.chart.settings?.backgroundColor} defaultValue={theme.bgColor}
		            onValueChange={onColorChange({
			            report,
			            chart,
			            prop: PeripheralStylePropNames.BACKGROUND_COLOR,
			            done: onValueChange
		            })}/>
		<DropdownValue label={Lang.CHART.BORDER_STYLE} options={BorderStyleOptions}
		               value={report.chart.settings?.border?.style} defaultValue={ChartBorderStyle.NONE}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: PeripheralStylePropNames.BORDER_STYLE,
			               done: onValueChange
		               })}/>
		<NumberValue label={Lang.CHART.BORDER_WIDTH} unitLabel={Lang.CHART.PIXEL}
		             value={report.chart.settings?.border?.width} defaultValue={0}
		             placeholder={'0 - 999'}
		             validate={validateNumber(3)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: PeripheralStylePropNames.BORDER_WIDTH,
			             done: onValueChange
		             })}/>
		<ColorValue label={Lang.CHART.BORDER_COLOR}
		            value={report.chart.settings?.border?.color} defaultValue={theme.borderColor}
		            onValueChange={onColorChange({
			            report,
			            chart,
			            prop: PeripheralStylePropNames.BORDER_COLOR,
			            done: onValueChange
		            })}/>
		<NumberValue label={Lang.CHART.BORDER_RADIUS} unitLabel={Lang.CHART.PIXEL}
		             value={report.chart.settings?.border?.radius} defaultValue={0}
		             placeholder={'0 - 9999'}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: PeripheralStylePropNames.BORDER_RADIUS,
			             done: onValueChange
		             })}/>
	</Section>;
};
