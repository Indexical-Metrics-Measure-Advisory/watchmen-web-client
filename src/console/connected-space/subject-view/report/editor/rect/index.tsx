import React, { ChangeEvent, useState } from 'react';
import { Lang } from '../../../../../../langs';
import { Report } from '../../../../../../services/tuples/report-types';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { Section } from '../settings-widgets/section';
import { PropName, PropValue, PropValueInput, PropValueUnit } from '../settings-widgets/widgets';

export const RectSection = (props: { report: Report }) => {
	const { report } = props;
	const { rect } = report;

	const { fire } = useReportEditEventBus();
	const [ delegate, setDelegate ] = useState({ width: `${rect.width}`, height: `${rect.height}` });
	const onPropChange = (prop: 'width' | 'height') => (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setDelegate({ ...delegate, [prop]: value });
	};
	const onPropBlur = (prop: 'width' | 'height') => () => {
		const value = delegate[prop];
		if (/^\d{1,4}$/.test(value)) {
			rect[prop] = parseInt(value);
			setDelegate({ ...delegate, [prop]: `${rect[prop]}` });
			fire(ReportEditEventTypes.SIZE_CHANGED, report);
		} else {
			setDelegate({ ...delegate, [prop]: `${rect[prop]}` });
		}
	};

	return <Section title={Lang.CHART.SECTION_TITLE_SIZE}>
		<PropName>{Lang.CHART.WIDTH}</PropName>
		<PropValue>
			<PropValueInput value={delegate.width}
			                onChange={onPropChange('width')} onBlur={onPropBlur('width')}/>
			<PropValueUnit>{Lang.CHART.PIXEL}</PropValueUnit>
		</PropValue>
		<PropName>{Lang.CHART.HEIGHT}</PropName>
		<PropValue>
			<PropValueInput value={delegate.height}
			                onChange={onPropChange('height')} onBlur={onPropBlur('height')}/>
			<PropValueUnit>{Lang.CHART.PIXEL}</PropValueUnit>
		</PropValue>
	</Section>;
};