import React from 'react';
import { Lang } from '../../../../../../langs';
import { CHART_MIN_HEIGHT, CHART_MIN_WIDTH } from '../../../../../../report/constants';
import { Report } from '../../../../../../services/tuples/report-types';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { NumberValue } from '../settings-widgets/number-value';
import { Section } from '../settings-widgets/section';
import { BasicStylesSection } from '../styles';

export const RectSection = (props: { report: Report }) => {
	const { report } = props;
	const { rect } = report;

	const { fire } = useReportEditEventBus();
	const validateNumber = (value: string) => {
		return /^\d{1,4}$/.test(value);
	};
	const onValueChange = (prop: 'width' | 'height') => (value?: string) => {
		let numberValue = value ? parseInt(value) : 0;
		if (prop === 'width') {
			numberValue = Math.max(numberValue, CHART_MIN_WIDTH);
		} else {
			numberValue = Math.max(numberValue, CHART_MIN_HEIGHT);
		}
		rect[prop] = numberValue;
		fire(ReportEditEventTypes.SIZE_CHANGED, report);
		return numberValue;
	};

	return <Section title={Lang.CHART.SECTION_TITLE_BASIC_STYLE}>
		<NumberValue label={Lang.CHART.WIDTH} unitLabel={Lang.CHART.PIXEL}
		             value={rect.width}
		             placeholder={'1 - 9999'}
		             validate={validateNumber} onValueChange={onValueChange('width')}/>
		<NumberValue label={Lang.CHART.HEIGHT} unitLabel={Lang.CHART.PIXEL}
		             value={rect.height}
		             placeholder={'1 - 9999'}
		             validate={validateNumber} onValueChange={onValueChange('height')}/>
		<BasicStylesSection report={report}/>
	</Section>;
};