import React from 'react';
import { Lang } from '../../../../../../langs';
import { Report } from '../../../../../../services/tuples/report-types';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { NumberValue } from '../settings-widgets/number-value';
import { Section } from '../settings-widgets/section';

export const RectSection = (props: { report: Report }) => {
	const { report } = props;
	const { rect } = report;

	const { fire } = useReportEditEventBus();
	const validateNumber = (value: string) => {
		return /^\d{1,4}$/.test(value);
	};
	const onValueChange = (prop: 'width' | 'height') => (value: string) => {
		const numberValue = parseInt(value);
		rect[prop] = numberValue;
		fire(ReportEditEventTypes.SIZE_CHANGED, report);
		return numberValue;
	};

	return <Section title={Lang.CHART.SECTION_TITLE_SIZE}>
		<NumberValue label={Lang.CHART.WIDTH}
		             value={rect.width}
		             placeholder={'1 - 9999'}
		             validate={validateNumber} onValueChange={onValueChange('width')}/>
		<NumberValue label={Lang.CHART.HEIGHT}
		             value={rect.height}
		             placeholder={'1 - 9999'}
		             validate={validateNumber} onValueChange={onValueChange('height')}/>
	</Section>;
};