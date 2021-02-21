import React from 'react';
import { DropdownOption } from '../../../../../../basic-widgets/types';
import { Lang } from '../../../../../../langs';
import { ChartTextDecoration } from '../../../../../../services/tuples/chart-types';
import { isCountChart } from '../../../../../../services/tuples/chart-utils';
import { Report } from '../../../../../../services/tuples/report-types';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { BooleanValue } from '../settings-widgets/boolean-value';
import { DropdownValue } from '../settings-widgets/dropdown-value';
import { Section } from '../settings-widgets/section';

const TextDecorationOptions: Array<DropdownOption> = [
	{ value: ChartTextDecoration.NONE, label: Lang.CHART.COUNT.TEXT_DECORATION_NONE },
	{ value: ChartTextDecoration.UNDERLINE, label: Lang.CHART.COUNT.TEXT_DECORATION_UNDERLINE },
	{ value: ChartTextDecoration.LINE_THROUGH, label: Lang.CHART.COUNT.TEXT_DECORATION_LINE_THROUGH },
	{ value: ChartTextDecoration.OVERLINE, label: Lang.CHART.COUNT.TEXT_DECORATION_OVERLINE },
];

export const ChartCountSettings = (props: { report: Report }) => {
	const { report } = props;
	const { chart } = report;

	const { fire } = useReportEditEventBus();

	if (!isCountChart(chart)) {
		return null;
	}

	const onBooleanChange = (value: boolean) => {
		if (!chart.settings) {
			chart.settings = {};
		}
		chart.settings.formatUseGrouping = value;
		fire(ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, report);
	};
	const onDropdownValueChange =  (option: DropdownOption) => {
		const { value } = option;
		if (!chart.settings) {
			chart.settings = {};
		}
		chart.settings.textDecoration = value;
		fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
	};

	return <Section title={Lang.CHART.SECTION_TITLE_COUNT_CHART}>
		<BooleanValue label={Lang.CHART.COUNT.FORMAT_USING_GROUP}
		              value={chart.settings?.formatUseGrouping} defaultValue={false}
		              onValueChange={onBooleanChange}/>
		<DropdownValue label={Lang.CHART.COUNT.TEXT_DECORATION} options={TextDecorationOptions}
		               value={chart.settings?.textDecoration} defaultValue={ChartTextDecoration.NONE}
		               onValueChange={onDropdownValueChange}/>
	</Section>;
};