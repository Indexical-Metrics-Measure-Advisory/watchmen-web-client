import React, { ChangeEvent, useState } from 'react';
import { Lang } from '../../../../../../langs';
import { Report } from '../../../../../../services/tuples/report-types';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { PropName, PropValue, PropValueInput, PropValueUnit } from '../settings-widgets/widgets';

export const BorderWidth = (props: { report: Report }) => {
	const { report } = props;
	const { chart: { settings } } = report;

	const { fire } = useReportEditEventBus();
	const [ delegate, setDelegate ] = useState({ width: `${settings?.borderWidth || 0}` });
	const onPropChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setDelegate({ width: value });
	};
	const onPropBlur = () => {
		const value = delegate.width;
		if (/^\d{1,2}$/.test(value) && (value as unknown as number) > 0) {
			if (!report.chart.settings) {
				report.chart.settings = {};
			}
			report.chart.settings.borderWidth = parseInt(value);
			fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
		}
	};

	return <>
		<PropName>{Lang.CHART.BORDER_WIDTH}</PropName>
		<PropValue>
			<PropValueInput value={delegate.width}
			                onChange={onPropChange} onBlur={onPropBlur}
			                placeholder='1 - 99'/>
			<PropValueUnit>{Lang.CHART.PIXEL}</PropValueUnit>
		</PropValue>
	</>;
};