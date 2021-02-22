import React from 'react';
import { Lang } from '../../../../../../langs';
import { ChartBorderStyle, ChartTextDecoration } from '../../../../../../services/tuples/chart-types';
import { isCountChart } from '../../../../../../services/tuples/chart-utils';
import { Report } from '../../../../../../services/tuples/report-types';
import { getCurrentTheme } from '../../../../../../theme/theme-wrapper';
import {
	CountChartStylePropNames,
	createFontFamilyOptions,
	FontStyleOptions,
	FontWeightOptions,
	onBooleanChange,
	onColorChange,
	onDropdownValueChange,
	onNumberChange,
	TextDecorationOptions,
	validateNumber
} from '../data-utils';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { useChartType } from '../settings-effect/use-chart-type';
import { BooleanValue } from '../settings-widgets/boolean-value';
import { ColorValue } from '../settings-widgets/color-value';
import { DropdownValue } from '../settings-widgets/dropdown-value';
import { NumberValue } from '../settings-widgets/number-value';
import { Section } from '../settings-widgets/section';

export const ChartCountSettings = (props: { report: Report }) => {
	const { report } = props;
	const { chart } = report;

	const { fire } = useReportEditEventBus();
	useChartType({ report });

	if (!isCountChart(chart)) {
		return null;
	}

	const onValueChange = () => {
		fire(ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, report);
	};

	const theme = getCurrentTheme();
	const FontFamilyOptions = createFontFamilyOptions(theme);

	return <Section title={Lang.CHART.SECTION_TITLE_COUNT_CHART}>
		<DropdownValue label={Lang.CHART.FONT_FAMILY} options={FontFamilyOptions}
		               value={chart.settings?.countText?.font?.family}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: CountChartStylePropNames.TEXT_FONT_FAMILY,
			               done: onValueChange
		               })}/>
		<ColorValue label={Lang.CHART.FONT_COLOR}
		            value={chart.settings?.countText?.font?.color} defaultValue={theme.fontColor}
		            onValueChange={onColorChange({
			            report,
			            chart,
			            prop: CountChartStylePropNames.TEXT_FONT_COLOR,
			            done: onValueChange
		            })}/>
		<NumberValue label={Lang.CHART.FONT_SIZE} unitLabel={Lang.CHART.PIXEL}
		             value={chart.settings?.countText?.font?.size} defaultValue={theme.fontSize}
		             validate={validateNumber(3)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: CountChartStylePropNames.TEXT_FONT_SIZE,
			             done: onValueChange
		             })}/>
		<DropdownValue label={Lang.CHART.FONT_STYLE} options={FontStyleOptions}
		               value={chart.settings?.countText?.font?.style} defaultValue={ChartBorderStyle.NONE}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: CountChartStylePropNames.TEXT_FONT_STYLE,
			               done: onValueChange
		               })}/>
		<DropdownValue label={Lang.CHART.FONT_WEIGHT} options={FontWeightOptions}
		               value={chart.settings?.countText?.font?.weight} defaultValue={`${theme.fontNormal}`}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: CountChartStylePropNames.TEXT_FONT_WEIGHT,
			               done: onValueChange
		               })}/>
		<DropdownValue label={Lang.CHART.COUNT.TEXT_DECORATION} options={TextDecorationOptions}
		               value={chart.settings?.countText?.textDecoration} defaultValue={ChartTextDecoration.NONE}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: CountChartStylePropNames.TEXT_DECORATION,
			               done: onValueChange
		               })}/>
		<BooleanValue label={Lang.CHART.COUNT.FORMAT_USING_GROUP}
		              value={chart.settings?.countText?.formatUseGrouping} defaultValue={false}
		              onValueChange={onBooleanChange({
			              report,
			              chart,
			              prop: CountChartStylePropNames.TEXT_FORMAT_USE_GROUPING,
			              done: onValueChange
		              })}/>
	</Section>;
};