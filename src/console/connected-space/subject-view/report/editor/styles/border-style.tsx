import React from 'react';
import { DropdownOption } from '../../../../../../basic-widgets/types';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { Lang } from '../../../../../../langs';
import { ChartBorder } from '../../../../../../services/tuples/chart-types';
import { Report } from '../../../../../../services/tuples/report-types';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { PropName, PropValue, PropValueDropdown } from '../settings-widgets/widgets';


export const BorderStyle = (props: { report: Report }) => {
	const { report } = props;
	const { chart: { settings } } = report;

	const { fire } = useReportEditEventBus();
	const forceUpdate = useForceUpdate();

	const onPropChange = (option: DropdownOption) => {
		const { value } = option;
		if (!report.chart.settings) {
			report.chart.settings = {};
		}
		report.chart.settings.border = value;
		forceUpdate();
		fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
	};

	const options: Array<DropdownOption> = [
		{ value: ChartBorder.NONE, label: () => ({ node: Lang.CHART.BORDER_NONE, label: '' }) },
		{ value: ChartBorder.SOLID, label: () => ({ node: Lang.CHART.BORDER_SOLID, label: '' }) },
		{ value: ChartBorder.DOTTED, label: () => ({ node: Lang.CHART.BORDER_DOTTED, label: '' }) },
		{ value: ChartBorder.DASHED, label: () => ({ node: Lang.CHART.BORDER_DASHED, label: '' }) }
	];

	return <>
		<PropName>{Lang.CHART.BORDER}</PropName>
		<PropValue>
			<PropValueDropdown value={settings?.border || ChartBorder.NONE} options={options}
			                   onChange={onPropChange}/>
		</PropValue>
	</>;
};